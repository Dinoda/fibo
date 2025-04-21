import path from 'path';

import database from '../../server/service/database.js';

const SELECT = `
SELECT
  s.filename,
  s.name,
  s.description,
  w.name AS work,
  e.name AS episode
FROM sound s 
LEFT JOIN episode e 
  ON e.id = s.episode 
LEFT JOIN work w 
  ON w.id = e.work
`;

const resources = async () => {
  const result = await database.query(SELECT);

  const res = [];

  result.forEach((row) => {
    res.push({ file: path.join(path.resolve('./sounds'), row.filename), name: `
      "${row.name}" - *${row.description} - ${row.work} - ${row.episode}*
    `});
  });

  return res;
};

export default await resources();
