import MariaDBDatabase from '../database/Database.js';

import loadFiles from './loadFiles.js';

const DEFAULT_OPTIONS = {
  prefix: "./src/genesis/",
  reverse: false,
  reverseDir: "reverse/"
};

const resolveOptions = (options) => {
  return {
    ...DEFAULT_OPTIONS,
    ...options
  };
};

const resolveParams = (options) => {
  let args = process.argv;
  let arg = args.shift();

  while (arg) {
    switch(arg) {
      case "--reverse":
      case "-r":
        options.reverse = true;
        if (args[0] && args[0].match(/^\w/)) {
          options.reverseDir = args.shift();
        }
        break;
      case "--no-reverse":
        options.reverse = false;
      default:
        break;
    }

    arg = args.shift();
  }

  return options;
};

export default async (files, options = {}) => {
  options = resolveOptions(options);
  options = resolveParams(options);

  if (!options.database || ! (options.database instanceof MariaDBDatabase)) {
    throw new Error("This script expect an existing MariaDBDatabase object to be given for genesis");
  }

  await loadFiles(files, options);
};
