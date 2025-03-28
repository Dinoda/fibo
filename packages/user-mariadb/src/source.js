import { Source } from 'fibo-user';

const removeFromArray = (arr, val) => {
	const idx = arr.indexOf(val);

	if (idx >= 0) {
		arr.splice(idx, 1);
	}

	return arr;
};

const DEFAULT_OPTIONS = {
	cacheDuration: 30000,
	securedFields: ["password"],
	fields: ["id", "username", "password"],
	tableName: "user",
	username: "username",
	id: "id"
};

const createQuerySQL = (options) => {
	if (options.querySQL) {
		return options.querySQL;
	}

	return `SELECT ${options.fields.join(', ')} 
	FROM \`${options.tableName}\`
	WHERE ${username} = ?
	`;
};

const createRegisterSQL = (options) => {
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

const createRegisterFields = removeFromArray;

const createUpdateSQL = (options) => {
	if (options.updateSQL) {
		return options.updateSQL;
	}

	return `
		UPDATE \`${options.tableName}\`
		SET 
			
		WHERE ${options.username} = ?
	`;
};

const createUpdateFields = (fields, username, id) => {
	let flds = removeFromArray(fields, username);
	flds = removeFromArray(fields, id);

	flds.push(username);

	return flds;
};

/**
 * Mariadb-powered User source
 *
 * @param database The database object (from "fibo-database-mariadb")
 * @param options The options for the source
 *
 * 	- cacheDuration: Keeps the users in cache for this duration (in ms)
 *
 * 	- querySQL: The sql query to use to get a user (empty by default, and created from the following fields)
 * 	- registerSQL: the sql query to use to register a new user (empty by default, and created from the following fields)
 * 	- updateSQL: The sql query to use to update a user (empty by default, and created from the following fields)
 *
 * 	- securedFields: Fields to remove from a user for securing it
 *
 * 	- registerFields: The fields to provide to the register sql. By default, takes the "fields" values, without the "id" field
 * 	- updateFields: The fields to provide to the update sql. By default, takes the "fields" values, with the "username"'s value moved to the end (to match with the "WHERE" sql field), and without the "id" field
 *
 * 	- fields: The fields the query gets
 * 	- tableName: The name of the table this source get its users from
 * 	- username: The field used to compare with the parameter from "getUser" method
 */
export default MariaDBUserSource extends Source {
	constructor(database, options) {
		super();

		this.database = database;
		this.options = {
			...DEFAULT_OPTIONS,
			...options
		};
		this.table = {};

		this.sql = {
			get: createQuerySQL(this.options),
			register: createRegisterSQL(this.options),
			update: createUpdateSQL(this.options),
		};

		if (!this.options.registerFields) {
			this.options.registerFields = createRegisterFields(this.options.fields, this.options.id);
		}

		if (!this.options.updateFields) {
			this.options.updateFields = createUpdateFields(this.options.fields, this.options.username, this.options.id);
		}
	}

	async loadUser(id) {
		const users = await this.database.query(this.sql, [id]);

		return users.length ? users[0] : null;
	}

	async getUser(id) {
		if (this.table[id]) {
			if (this.table[id].ts > Date.now()) {
				return this.table[id].user;
			}
		}

		this.table[id] = {
			user: await this.loadUser(id),
			ts: Date.now() + this.options.cacheDuration,
		};

		return this.table[id].user;
	}

	getSecuredUserForUser(user) {
		for (const fld of this.options.securedFields) {
			delete user[fld];
		}

		return user;
	}

	async getSecuredUser(id) {
		return this.getSecuredUserForUser(await this.getUser(id));
	}

	async registerUser(user) {
	}

	async updateUser(user) {
	}
}
