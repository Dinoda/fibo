# validate

## Example

```js
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

const validity = validator.validate({
    id: 123,
    name: "Georges",
    //male: not indicated
    favoriteNumber: 4
});
console.log(validity);
// true

console.log(validator.validate({
    id: 123,
    name: "Georges",
}));
// false

console.log(validator.detail({
    id: 123,
    name: "Georges",
}));
/*
{
  id: true,
  name: true,
  male: true,
  doABarrelRoll: true,
  age: true,
  favoriteNumber: false
}
*/

console.log(validator.detail({
    id: 123,
    name: "Georges",
    age: "Hell yeah!",
    doABarrelRoll: () => {},
}));
/*
{
  id: true,
  name: true,
  age: false,
  doABarrelRoll: true,
  male: true,
  favoriteNumber: false
}
*/
```

## Types available (and valid strings to use them)

```js
// Types
{
    and(a, b),          // Takes 2 validator
    or(a, b),           // Takes 2 validator 
    required, 
    nullable,
    requiredAnd(a),     // Shortcut for and(required, a)
    nullableOr(a),      // Shortcut for or(nullable, a)
    object,
    string,
    array,
    number,
    integer,
    range,
    boolean,
    callable,
}
```
