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

output.outputPage = async (builder, pageName, directory, data) => {
  const stat = fs.lstat(directory);

  await stat.catch(() => {
    fs.mkdir(directory);
  });

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
