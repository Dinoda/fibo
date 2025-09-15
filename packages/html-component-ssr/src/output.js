import fs from 'node:fs/promises';
import path from 'node:path';

const output = {};

output.formatter = (a) => a;

output.setFormat = async (minified = true) => {
  output.formatter = (await import('htmlfy'))[minified ? 'minify' : 'prettify']
};

output.setCustomFormatter = (formatter) => {
  output.formatter = formatter;
};

output.outputPage = async (builder, pageName, data) => {
  await builder.buildPage(pageName, data);
  
  await fs.writeFile(
    path.join(
      directory,
      pageName
    ), 
    builder.getPageHTML(
      pageName,
      output.formatter
    )
  );
};

export { output };
