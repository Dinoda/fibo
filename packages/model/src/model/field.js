import { validationParameters, types } from "fibo-validate";
import * as validation from "./typing.js";

export const fieldValidator = validationParameters({
  type: "!string",
  range: "range",
  null: "boolean",
  key: "boolean",
  default: (value, field) => {
    if (types[field.type]) {
      types[field.type](value);
    } else {
      throw new Error(
        '"default" field validator not defined for this type... Sorry...'
      );
    }
  },
  auto: "boolean",
  unique: "boolean",
  references: () => {}
});

export const requiredProps = ["id", "type"];

export const fieldProperties = Object.keys(fieldPropertyValidations);

export default mdl => {
  const fields = {};

  for (const fmeta of mdl.fields) {
    fields[fmeta.name] = new ModelField(fmeta);
  }

  return fields;
};
