import 'dotenv/config';

import genesis from 'fibo-database-mariadb/genesis';

import database from './database.js';

await genesis(database, {
});
process.exit(0);
