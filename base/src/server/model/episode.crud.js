import CRUD from 'fibo-crud';

import Validator, { types as v } from 'fibo-validate';

import database from '../service/database.js';

import { SELECT_ALL, SELECT, INSERT, UPDATE, DELETE } from './episode.sql.js';

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
      work: 'integer',
    },
  },
  update: {
    sql: UPDATE,
    params: {
      name: "",
      description: "",
      work: "integer",
      id: "integer",
    },
  },
  delete: {
    sql: DELETE, 
    params: ['id'],
  },
}, {
    validators: {
      def: new Validator({
        id: 'integer',
        name: v.requiredAnd(v.string),
        description: 'string',
        work: 'integer'
      }),
    },
    defaultValidator: 'def',
  });
