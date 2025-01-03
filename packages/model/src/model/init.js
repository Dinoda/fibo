import check from "./check.js";
import initFields from "../field/init.js";
import initValidator from "./validation.js";
import proxy from "./proxy.js";

export default model => {
  check(model);

  const meta = model;

  meta.fields = initFields(meta.fields);

  meta.validator = initValidator(meta.fields);

  meta.proxy = proxy(model);

  return meta;
};
