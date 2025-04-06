import { Source } from 'fibo-user';
import { createQuerySQL, createRegisterSQL, createUpdateSQL }from './sql.js';
import { createRegisterFields, createUpdateFields } from './fields.js';

const DEFAULT_OPTIONS = {
	cacheDuration: 30000,
	securedFields: ["password"],
	fields: ["id", "username", "password"],
	tableName: "user",
	username: "username",
	id: "id"
};

/**
 * Mariadb-powered User source
 *
 * @param MariaDBDatabase database The database object (from "fibo-database-mariadb")
 * @param Object options The options for the source
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
export default class MariaDBUserSource extends Source {
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

  /**
   * @inherit
   */
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

  /**
   * @inherit
   */
	getSecuredUserForUser(user) {
		for (const fld of this.options.securedFields) {
			delete user[fld];
		}

		return user;
	}

  /**
   * @inherit
   */
	async registerUser(user) {
    const result = await this.database.query(this.sql.register, this.resolveFields(user, this.options.registerFields));

    return result.affectedRows == 1;
	}

  /**
   * @inherit
   */
	async updateUser(user) {
    const result = await this.database.query(this.sql.update, this.resolveFields(user, this.options.updateFields));

    return result.affectedRows == 1;
	}

  resolveFields(user, fieldSelection) {
    const fields = [];

    for (const fld of fieldSelection) {
      fields.push(user[fld]);
    }

    return fields
  }
}

