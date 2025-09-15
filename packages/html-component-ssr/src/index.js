import Builder from 'fibo-html-component';
import SSRPattern from './Pattern.js';

if (typeof window != 'undefined') {
  throw new Error('This code should not be loaded in a browser / client environment, if you are looking for a client side document management, load "fibo-html-component/clientdoc"');
}

export { componentDocument as Document, DocumentBundle } from './document.js';
export { output } from './output.js';
export { SSRPattern };

export default (options = {}) => {
  return new Builder({
    pattern: SSRPattern,
    ...options,
  });
};


