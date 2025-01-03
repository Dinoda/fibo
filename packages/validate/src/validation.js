import Validator from "./Validator.js";

const defaultOptions = {
  ignoreNoValidation: true
};

export function getAllKeys(entity) {
  return [...Object.keys(entity), ...Object.keys(this.validators)];
}

export function getEntityKeys(entity) {
  return Object.keys(entity);
}

export function getValidatorKeys(entity) {
  return Object.keys(this.validators);
}

export function std(key, entity, validator) {
  if (!validator) {
    return true;
  }
  return validator(entity[key]);
}

export function woValidator(key, entity, validator) {
  if (!validator) {
    return false;
  }
  return validator(entity[key]);
}

export function validate(keys, entity) {
  for (const key of keys) {
    if (!this.__valid(key, entity, this.validators[key])) {
      return false;
    }
  }

  return true;
}

export function validateWithDepth(keys, entity) {
  for (const key of keys) {
    const vld = this.validators[key];
    if (this.validators[key] instanceof Validator) {
      if (!vld.validate(entity[key])) {
        return false;
      }
    } else {
      if (!this.__valid(key, entity, vld)) {
        return false;
      }
    }
  }

  return true;
}

export function detail(keys, entity) {
  const result = {};

  for (const key of keys) {
    result[key] = this.__valid(key, entity, this.validators[key]);
  }

  return result;
}

export function detailWithDepth(keys, entity) {
  const result = {};

  for (const key of keys) {
    const vld = this.validators[key];
    if (vld instanceof Validator) {
      result[key] = vld.detail(entity[key]);
    } else {
      result[key] = this.__valid(key, entity, vld);
    }
  }

  return result;
}
//export function validateAllEntity
/*
const validate = (key, entity, validator, options) => {
  const value = entity[key];
  const specValid = validator[key];

  if (specValid && typeof specValid != "function") {
    throw new Error(
      `The validators given are not functions for value "${key}", "${typeof specValid}" given`
    );
  }

  if (!specValid && !options.ignoreNoValidation) {
    throw new Error(
      `Can't validate "${key}" as there is no validator and "ignoreNoValidation" option is set to "false"`
    );
  }

  if (specValid) {
    return specValid(value, entity);
  }

  return true;
};

const getKeys = (entity, validators) => {
  if (validators && validators.__keys) {
    return [...validators.__keys, ...Object.keys(entity)];
  } else {
    return [...Object.keys(validators), ...Object.keys(entity)];
  }
};

export default (entity, param) => {
  const options = param.__options || defaultOptions;

  let result;

  for (const key of getKeys(entity, param)) {
    if (!validate(key, entity, param, options)) {
      return false;
    }
  }

  return true;
};

export const detailedValidation = (entity, param) => {
  const options = { ...defaultOptions, ...param.__options };
  let result = {};

  for (const key of getKeys(entity, param)) {
    result[key] = validate(key, entity, param, options);
  }

  return result;
};
*/
