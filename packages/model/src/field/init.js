import ModelField from "../ModelField.js";
import validator from "./validation.js";

export default fields => {
  if (!fields || Object.keys(fields).length == 0) {
    throw new Error(`This model element is missing "fields"`);
  }

  const fld = {};

  for (const id in fields) {
    if (!validator.validate(fields[id])) {
      throw new Error(
        `Field "${id}"'s parameters has been defined as unvalid: ${JSON.stringify(
          validator.detail(fields[id])
        )}`
      );
    }
    fld[id] = new ModelField(id, fields[id]);
  }

  return fld;
};
