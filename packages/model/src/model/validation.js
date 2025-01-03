import Validator from "fibo-validate";
import * as v from "fibo-validate/validators";

export default fields => {
  const validators = {};

  for (const key in fields) {
    const fld = fields[key];

    if (fld.required()) {
      validators[key] = v.requiredAnd(v[fld.type]);
    } else {
      validators[key] = v.nullableOr(v[fld.type]);
    }
  }

  return new Validator(validators, { validatorOnly: true });
};
