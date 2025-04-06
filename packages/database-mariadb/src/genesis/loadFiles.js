import fs from 'fs/promises';
import path from 'path';

const loadFile = async (filepath, database) => {
  const sql = await fs.readFile(filepath, { encoding: "utf-8" });

  console.log(sql);

  await database.query(sql, []);
};

export default async (files, options = {}) => {
  let prefix = options.prefix;
  if (options.reverse) {
    prefix = path.join(prefix, options.reverseDir);

    files = files.reverse();
  }

  const database = options.database;

  for (const file of files) {
    console.log(`Loading script "${file}":`);

    await loadFile(path.join(prefix, file), database);
  }

  console.log('Genesis finished');
};
