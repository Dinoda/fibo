import CRUD from 'fibo-crud';

import database from '../service/database.js';

import { SELECT_ALL, SELECT, INSERT, UPDATE, DELETE } from './work.sql.js';

const crud = new CRUD(database, {
  selectAll: {
    sql: SELECT_ALL,
  },
  select: {
    sql: SELECT,
    params: ['id'],
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
});

export default crud;


