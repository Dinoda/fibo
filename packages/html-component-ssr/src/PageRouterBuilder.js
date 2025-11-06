import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export default class PageRouterBuilder {
  constructor(directory, router) {
    this.dir = directory;
    this.router = router;
    this.pages = [];
  }

  async initialize() {
    return readdir(this.dir).then((files) => {
      for (const file of files) {
        this.pages.push(file);
      }
    });
  }

  getRouter(prefix = "/page") {
    this.router.route(prefix + '/:page([^\\.]+)').get((req, res) => {
      const page = req.params.page;

      if (this.pages[page]) {
        res.sendFile(join(this.dir, page));
      } else {
        res.status(404).send();
      }
    });

    return this.router;
  }
}
