import 'dotenv/config';

import genesis from 'fibo-database-mariadb/genesis';

import database from '../src/server/service/database.js';

//import itemsData from './loadItemsData.js';

await genesis(database, {
  datasources: {
    //items: itemsData,
  }
});

process.exit(0);

