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
