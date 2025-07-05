import fs from 'node:fs';
import path from 'node:path';

import { JSDOM } from 'jsdom';

if (typeof window !== 'undefined') {
  throw new Error('This code should not be loaded in a browser / client environment, if you are looking for a client side document management, load "fibo-html-component/clientdoc"');
}

export const createDocumentFromHTML = (html) => {
  const d = new JSDOM(html);

  return d;
};

export const createDocumentFromFile = (filepath) => {
  return createDocumentFromHTML(fs.readFileSync(filepath), { encoding: 'utf-8' });
};

export const createDocumentsFromDirectory = async (directory, depth = false, extensions = ['.html']) => {
  if (! Array.isArray(extensions)) {
    extensions = [extensions];
  }

  const files = fs.readdirSync(directory).map((file) => {
    return path.join(directory, file);
  });

  const docs = {};

  let file;

  while (files.length > 0) {
    file = files.shift();

    const stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      if (depth) {
        const subfiles = fs.readdirSync(file);

        for (const subf of subfiles) {
          files.push(path.join(file, subf));
        }
      }
    } else if (extensions.includes(path.extname(file))) {
      docs[path.basename(file)] = await createDocumentFromFile(file);
    }
  }

  return docs;
};

export const createFileFromPage = async (builder, pageName, directory, formatter = undefined) => {
  await fs.writeFileSync(
    path.join(
      directory, 
      pageName
    ), 
    builder.getPageHTML(
      pageName, 
      formatter
    )
  );
};
