import CRUD from 'fibo-crud';

import Validator, { types as v } from 'fibo-validate';

import database from '../service/database.js';

import { SELECT_ALL, SELECT, INSERT, UPDATE, DELETE } from './work.sql.js';

const crud = new CRUD(database, {
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
    params: ['name', 'description'],
    select: false,
  },
  update: {
    sql: UPDATE,
    params: ['name', 'description', 'id'],
    select: false,
  },
  delete: {
    sql: DELETE,
    params: ['id'],
    select: false,
  },
}, {
    validators: {
      def: new Validator({
        id: 'integer',
        name: v.requiredAnd(v.string),
        description: 'string',
      }),
    },
    defaultValidator: 'def',
  });

export default crud;


