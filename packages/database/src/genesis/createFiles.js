import fs from 'fs/promises';
import path from 'path';

function getFullDate() {
  const dt = new Date();

  return dt.getFullYear() + '' + (dt.getMonth() + 1) + dt.getDate() + '-' + dt.getHours() + '' + dt.getMinutes();
}
export default (dir, reverseDir, filename) => {
  const file = getFullDate() + (filename === true ? '.sql' : '-' + filename + '.sql');
  const proms = [];

  proms.push(
    fs.writeFile(path.join(dir, file), `CREATE TABLE \`${filename === true ? 'tableName' : filename}\` (
  id INTEGER PRIMARY KEY AUTO_INCREMENT
);
`)
  );

  proms.push(
    fs.writeFile(path.join(reverseDir, file), `DROP TABLE \`${filename === true ? 'tableName' : filename}\`;`)
  );

  return Promise.all(proms).then(() => {
    return file;
  });
};
