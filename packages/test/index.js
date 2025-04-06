//import "./src/server.js";
//import "./src/database.js";
//import "./src/validation.js";
//import "./src/user.js";





/*
import timing from "./src/testing/timing.js";

const createRegisterFields = (fields, id) => {
	return fields.reduce((res, fld) => {
		if (fld != id) {
			res.push(fld);
		}

		return res;
	}, []);
};

const testRegisterFields = () => {
	let array = ["a", "b", "c", "d", "e"];

	let result = createRegisterFields(array, "c");

	return result;
};

const createTest2 = (fields, id) => {
	const idx = fields.indexOf(id);

	if (idx) {
		fields.splice(idx, 1);
	}

	return fields;
};

const test2 = () => {
	let array = ["a", "b", "c", "d", "e"];

	let result = createTest2(array, "c");

	return result;
};

console.log(testRegisterFields());
console.log(test2());
console.log("Original");
console.log(await timing(testRegisterFields, 10000));

console.log('IndexOf + Delete');
console.log(await timing(test2, 10000));

*/
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
