import Validator, { types } from "fibo-validate";

const defaultValidate = (value, field) => {
  if (types.nullable(value)) {
    return true;
  }

  if (types[field.type]) {
    types[field.type](value);
  } else {
    throw new Error(
      '"default" field validator not defined for this type... Sorry...'
    );
  }
};

export default new Validator(
  {
    type: "!string",
    range: "range",
    null: "boolean",
    key: "boolean",
    default: defaultValidate,
    auto: "boolean",
    unique: "boolean",
    references: {
      model: "!string",
      field: "!string"
    }
  },
  {
    maxDepth: 1
  }
);
