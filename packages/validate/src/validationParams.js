import * as typeValidators from "./typing.js";
import { customs } from "./custom.js";

const validators = { ...typeValidators, ...customs };

const validateAnd = arr => {
  return value => {
    return arr[0](value) && arr[1](value);
  };
};

const validateOr = arr => {
  return value => {
    return arr[0](value) || arr[1](value);
  };
};

const string = param => {
  if (param.charAt(0) == "!") {
    return validateAnd([validators.required, validators[param.slice(1)]]);
  } else {
    return validateOr([validators.nullable, validators[param]]);
  }
};

const object = params => {
  const res = {};

  for (const key in params) {
    const value = params[key];

    res[key] = direct(value);
  }

  return res;
};

const direct = param => {
  if (typeof param == "function") {
    return param;
  }

  if (validators.object(param)) {
    return object(param);
  }

  if (validators.string(param)) {
    return string(param);
  }
};

export default (param, options = {}) => {
  const res = direct(param);

  if (typeValidators.object(res)) {
    res.__keys = Object.keys(res);
    res.__options = options;
  }

  return res;
};
