import CRUD from 'fibo-crud';

import Validator, { types as v } from 'fibo-validate';

import database from '../service/database.js';

import { SELECT_ALL, SELECT, INSERT, UPDATE, UPDATE_NO_FILE, DELETE } from './sound.sql.js';

export default new CRUD(database, {
  selectAll: {
    sql: SELECT_ALL,
    select: true,
  },
  select: {
    sql: SELECT,
    params: ['id'],
    select: true,
  },
  insert: {
    sql: INSERT,
    params: {
      name: '',
      description: '',
      filename: '',
      episode: 'integer',
    },
  },
  update: {
    sql: UPDATE,
    params: {
      name: '',
      description: '',
      filename: '',
      episode: 'integer',
      id: 'integer'
    }
  },
  updateNoFile: {
    sql: UPDATE_NO_FILE,
    params: {
      name: "",
      description: "",
      episode: "integer",
      id: "integer",
    },
    validator: "noFile",
  },
  delete: {
    sql: DELETE,
    params: ['id'],
    delete: true,
  }
}, {
    validators: {
      def: new Validator({
        id: "integer",
        name: v.requiredAnd(v.string),
        description: 'string',
        filename: v.requiredAnd(v.string),
        episode: v.requiredAnd(v.integer),
      }),
      noFile: new Validator({
        id: "integer",
        name: v.requiredAnd(v.string),
        description: 'string',
        episode: v.requiredAnd(v.integer),
      }),
    },
    defaultValidator: 'def',
  });
