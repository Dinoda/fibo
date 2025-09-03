import fs from 'node:fs/promises';
import path from 'node:path';

import { JSDOM } from 'jsdom';

const componentDocument = {};

componentDocument.createFromHTML = (html) => {
  return new JSDOM(html);
};

componentDocument.createFromFile = (filepath) => {
  return new Promise((res, rej) => {
    fs.readFile(filepath).then((html) => {
      res(
        componentDocument.createFromHTML(html, { encoding: 'utf-8' })
      );
    }).catch(err => {
      rej(err);
    });
  });
};

componentDocument.createFromDirectory = (directory, depth = false, extensions = ['.html']) => {
  return new Promise((res, rej) => {
    if (! Array.isArray(extensions)) {
      extensions = [extensions];
    }

    const resolveFile = (file) => {
      return new Promise((r, rj) => {
        fs.lstat(file).then((fstat) => {
          if (fstat.isDirectory()) {
            if (depth) {
              r(componentDocument.createFromDirectory(file, depth, extensions));
            } else {
              r();
            }
          } else if (extensions.includes(path.extname(file))) {
            componentDocument.createFromFile(
              path.join(directory, file)
            ).then(doc => {
              r(doc);
            });
          } else {
            r();
          }
        });
      });
    };

    fs.readdir(directory).then((files) => {
      const proms = [];

      for (const file of files) {
        proms.push(resolveFile(file));
      }

      Promise.all(proms).then((docs) => {
        if (depth) {
          res(clean(flatten(docs)));
        } else {
          res(clean(docs));
        }
      });
    });
  });
};

export componentDocument;
