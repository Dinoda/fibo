import components from './components.js';

import createModel from './init/creation.js';
import buildModel from './build/build.js';

import CSRBuildingPatterns from './build/CSR.js';

export default (parent, componentName, data, options = {}) => {
  if (! components[componentName]) {
    throw new Error(`No component found with name "${componentName}"`);
  }
  buildModel(parent, components[componentName], data, options);
};

export const loadDocument = (componentDoc) => {
  console.log(componentDoc);
  for (const elem of componentDoc.body.children) {
    console.log(`Creating a model with name ${elem.id}`);
    components[elem.id] = createModel(elem);
  }
};

export const loadHTML = (html) => {
  const d = document.implementation.createHTMLDocument();

  d.write(html);
  d.close();

  loadDocument(d);
};

export const loadHTMLFromURL = async (url) => {
  const resource = await fetch(url);

  loadHTML(await resource.text());
};

const patterns = {
  CSR: CSRBuildingPatterns,
};

export default (type, options = {}) => {
  if (patterns[type]) {
    return new HTMLBuilder({ ...options, type, pattern: new patterns[type]() });
  }

  throw new Error(`Unknown type "${type}", known types are: ${Object.keys(patterns).join(', ')}`);
};

export const addPattern = (name, patternClass) => {
  patterns[name] = patternClass;
};
