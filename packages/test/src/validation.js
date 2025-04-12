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

import Validator, { types as t } from 'fibo-validate';

const parameters = {
    id: "integer",
    name: "string",
    male: "boolean",
    doABarrelRoll: "callable",
    // Optional value (default)
    age: t.nullableOr(t.integer),
    // Required value
    favoriteNumber: t.requiredAnd(t.integer)
};

const options = {
    // options, defaults:
    maxDepth: 0,
    /**
   * Will only validate for the entity's keys (false by default).
   *
   * By default, the validator will validate all keys, from validated entity and validators.
   */
    entityOnly: false,
    /**
   * Will consider a key without validator a failure (default to false).
   */
    failWithoutValidator: false,
    /**
   * Will only validate for the validator's keys, ignore if entityOnly is set to true (false by default)
   *
   * By default, the validator will validate all keys, from validated entity and validators.
   */
    validatorOnly: false,
    /**
   * Validate if the given entity is empty (null, undefined, empty string), true by default
   */
    validEmpty: true
};

const validator = new Validator(parameters, options);

console.log(validator.validate({
    id: 123,
    name: "Georges",
    //male: not indicated
    favoriteNumber: 4
}));
// true


console.log(validator.validate({
    id: 123,
    name: "Georges",
}));
// false

console.log(validator.detail({
    id: 123,
    name: "Georges",
    age: 3
}));
/*
{

}
*/

console.log(validator.detail({
    id: 123,
    name: "Georges",
    age: "Hell yeah!",
}));
