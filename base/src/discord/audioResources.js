import path from 'path';

import database from '../server/service/database.js';

export default async () => {
  const result = await database.query('SELECT * FROM sound');

  const res = [];

  result.forEach((row) => {
    res.push({ file: path.join(path.resolve('./sounds'), row.filename), name: row.name });
  });

  return res;
};

