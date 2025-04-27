import 'dotenv/config';

import genesis from 'fibo-database-mariadb/genesis';

import database from '../src/server/service/database.js';

await genesis(database);

process.exit(0);

