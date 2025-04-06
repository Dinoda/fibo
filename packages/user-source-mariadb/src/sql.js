export const createQuerySQL = (options) => {
	if (options.querySQL) {
		return options.querySQL;
	}

	return `SELECT ${options.fields.join(', ')} 
	FROM \`${options.tableName}\`
	WHERE ${username} = ?
	`;
};



export const createRegisterSQL = (options) => {
	if (options.registerSQL) {
		return options.registerSQL;
	}

	return `
		INSERT INTO \`${options.tableName}\`
		(${options.fields.join(', ')})
		VALUES
		(${options.fields.map(() => "?").join(', ')})
	`;
};




export const createUpdateSQL = (options) => {
	if (options.updateSQL) {
		return options.updateSQL;
	}

	return `
		UPDATE \`${options.tableName}\`
		SET 
			
		WHERE ${options.username} = ?
	`;
};

