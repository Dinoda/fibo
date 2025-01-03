//import "./src/server.js";
//import "./src/database.js";
import Validator from "fibo-validate";

const v = new Validator(
  {
    type: "!string",
    range: "range",
    null: "boolean",
    key: "boolean",
    auto: "boolean",
    unique: "boolean",
    references: {
      model: "!string",
      field: "!string"
    }
  },
  {
    maxDepth: 1,
    children: {
      references: {
        stupidOption: true
      }
    }
  }
);

console.log("Created");
console.log(v);
console.log("Validation");

const o = {
  type: "integer",
  key: true,
  auto: true,
  references: {
    model: "a",
    field: "b"
  }
};

console.log(v.validate(o));
console.log(v.detail(o));

/*
let a = { a: "b", c: "d" };
console.log(a);
console.log({ ...a });
console.log({ a: "d", ...a });
console.log({ ...a, a: "d" });
console.log("Heyoo");
*/
