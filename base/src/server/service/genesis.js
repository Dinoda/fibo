import 'dotenv/config';

import genesis from 'fibo-database-mariadb/genesis';

import files from '../../genesis/load_order.js';
import database from './database.js';

await genesis(files, {
  database,
});
process.exit(0);
