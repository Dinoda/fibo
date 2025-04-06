const removeFromArray = (arr, val) => {
	const idx = arr.indexOf(val);

	if (idx >= 0) {
		arr.splice(idx, 1);
	}

	return arr;
};

export const createRegisterFields = removeFromArray;

export const createUpdateFields = (fields, username, id) => {
	let flds = removeFromArray(fields, username);
	flds = removeFromArray(fields, id);

	flds.push(username);

	return flds;
};

