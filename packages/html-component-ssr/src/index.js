import Builder, { IInitializer, IProcessor } from 'fibo-html-component';

if (typeof window != 'undefined') {
  throw new Error('This code should not be loaded in a browser / client environment, if you are looking for a client side document management, load "fibo-html-component/clientdoc"');
}

export { componentDocument as Document, DocumentBundle } from './document.js';
export { output } from './output.js';
export { Builder, IInitializer, IProcessor };

export default (options = {}) => {
  return new Builder({
    ...options,
  });
};


