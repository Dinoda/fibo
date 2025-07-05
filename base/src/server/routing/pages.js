import fs from 'node:fs';
import path from 'node:path';
import { createRouter } from "fibo-server";

const publicDir = path.resolve('./public');
const files = {};

for (const file of fs.readdirSync(publicDir)) {
  if (path.extname(file) === '.html') {
    files[path.basename(file, '.html')] = path.join(publicDir, file);
  }
}

const router = createRouter();

router.route('/:page([^\\.]+)').get((req, res) => {
  const page = req.params.page;

  if (files[page]) {
    res.sendFile(files[page]);
  } else {
    res.status(404).send();
  }
});

export default router;
