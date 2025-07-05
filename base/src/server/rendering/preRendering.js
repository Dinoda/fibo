import fs from 'node:fs/promises';
import path from 'node:path';

import { prettify } from 'htmlfy';

import HTMLBuilder from 'fibo-html-component';
import { createFileFromPage } from 'fibo-html-component/serverdoc';

import fileImport from './fileImport.js';

const src = './src/html';
const resources = './src/htmlResources';

const output = './public';

const files = [
  { 
    name: 'index.html',
    directory: '.',
    data: {
      title: "ViBo - Visual Board Online" 
    },
  }
];

export default async () => {

  const formatter = (await import('htmlfy'))[process.env.PROD ? 'minify' : 'prettify'];
  //console.log('PreRendering...');
  const builder = HTMLBuilder.createSimplePR();

  //console.log('Importing files...');
  await fileImport(builder, src, resources);

  for (const file of files) {
    //console.log('Building ' + file.name);

    await builder.buildPage(file.name, file.data);
    //console.log('Built');

    await createFileFromPage(builder, file.name, path.join(output, file.directory), prettify);
    //console.log(`Page successfully rendered: ${path.join(file.directory, file.name)}`);
  }
};
