//import "./src/server.js";
//import "./src/database.js";
import { Listenable } from "fibo-browser";
import Validator from "fibo-validate";

import Storage from "fibo-browser-store";

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

const urlRegex = /:[\w\d_]+/g;

function initUrls(urls) {
  for (const key in urls) {
    const url = urls[key];

    if (typeof url == "string") {
      const matches = url.match(urlRegex);

      urls[key] = {
        base: url,
        params: matches ? matches.map(m => m.slice(1)) : []
      };
      console.log(matches);
    }

    console.log(urls);
  }
}
initUrls({
  get: "/api/doc",
  getOne: "/api/doc/:id",
  create: "/api/doc",
  update: "/api/doc/:id/:name/:name_second"
});

const l = new Listenable();

const f = () => {
  console.log("Hell yeah!");
};

l.addListener("reset", f);

l.trigger("reset");

new Storage("work", {
  urls: { get: "/api/work" }
});

/*
let a = { a: "b", c: "d" };
console.log(a);
console.log({ ...a });
console.log({ a: "d", ...a });
console.log({ ...a, a: "d" });
console.log("Heyoo");
*/
