import { Database } from 'fibo-database';
import Validator, { types as v } from 'fibo-validate';

const opeValidator = new Validator({
  sql: v.requiredAnd(v.string),
  // params: [Optional] Default to []
  params: v.nullableOr(v.array),
  // hydrator: [Optional] Name of the hydrator for this operation
  // Default to option's "defaultHydrator" (or "defaultUpdateHydrator", if "select" is false)
  hydrator: v.nullableOr(v.string),
  // validator: [Optional] Name of the validator for this operation
  // Default to option's "defaultValidator"
  validator: v.nullableOr(v.string),
  // select: [Optional] Default to "false", indicate if the operation is a "SELECT". If true, validation is processed after
  // By default, the validation operation is performed before the query
  select: v.nullableOr(v.boolean),
});

const optValidator = new Validator({
  // hydrators: [Optional] No hydration is mandatory, this is an object with hydration callables
  hydrators: 'object',
  // defaultHydrator: [Optional] Define the default hydrator from "hydrators"
  // Default is no hydration, plain database returned objects
  defaultHydrator: 'string',
  // defaultUpdateHydrator: [Optional] Define the default hydrator for non-select operations
  defaultUpdateHydrator: 'string',
  // validators: [Optional] Some validators if needed
  validators: 'object',
  // defaultValidator: [Optional] Define the default validator
  // Default to no validation
  defaultValidator: 'string',
});

/**
 * => Request => Operation (Parameters, Object) => Hydration => Result => 
 *
 *
 */
export default class CRUD {
  constructor(database, operations, options = {}) {
    if (! (database instanceof Database)) {
      throw new Error("database is expected to be an instance of Database");
    }

    if (! optValidator.validate(options)) {
      throw new Error(`Options are not valid:
${JSON.stringify(optValidator.detail(options))}`);
    }

    for (const k in operations) {
      const ope = operations[k];
      if (! opeValidator.validate(ope)) {
        throw new Error(`Operation "${k}" is not a valid operation:
${JSON.stringify(opeValidator.detail(ope))}`);
      }
    }

    this.db = database;
    this.operations = operations;

    if (options.hydrators) {
      this.hydrators = options.hydrators;
      this.defaultHydrator = options.defaultHydrator ? this.hydrators[options.defaultHydrator] : (a) => a;
      this.defaultUpdateHydrator = options.defaultUpdateHydrator ? this.hydrators[options.defaultUpdateHydrator] : (a) => a.affectedRows > 0;
    } else {
      this.hydrators = {};
      this.defaultHydrator = (a) => a;
      this.defaultUpdateHydrator = (a) => a.affectedRows > 0;
    }

    if (options.validators) {
      this.validators = options.validators;
      this.defaultValidator = options.defaultValidator ? this.validators[options.defaultValidator] : null;
    } else {
      this.validators = {};
      this.defaultValidator = null;
    }
  }

  async callOperation(name, data) {
    const ope = this.operations[name];

    if (!ope) {
      throw new Error(`Unknown operation "${name}", couldn't proceed`);
    }

    const validator = this.getValidator(ope);

    if (!ope.select) {
      if (validator && ! validator.validate(data)) {
        throw new Error(`Unvalid data provided for operation "${name}", failure to process operation`);
      }
    }

    const fields = this.resolveFields(ope.params, data);

    const result = await this.db.query(ope.sql, fields);

    const hydrated = this.hydrate(ope.hydration, result, ope.select);

    if (ope.select && validator) {
      for (const row of hydrated) {
        if (! validator.validate(data)) {
          throw new Error(`Hydrated data is not valid for operation "${name}", check your validator and hydrator or fix your database`);
        }
      }
    }

    return hydrated;
  }

  resolveFields(params, data) {
    if (!params) {
      return [];
    }
    return params.map((a) => {
      return data[a];
    });
  }

  hydrate(hydrator, data, select) {
    if (hydrator) {
      return this.hydrators[hydrator](data);
    }

    return select ? this.defaultHydrator(data) : this.defaultUpdateHydrator(data);
  }

  getValidator(ope) {
    if (ope.validator) {
      return this.validators[ope.validator];
    }

    return this.defaultValidator;
  }
}
