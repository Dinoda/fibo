import Builder, { IPattern } from 'fibo-html-component';

if (typeof window === 'undefined') {
  throw new Error('This code should not be loaded outside of a browser / client environment, if you are looking for a server side document management, load "fibo-html-component/serverdoc"');
}

export { componentDocument } from './document.js';

export default (options = {}) => {
  return new Builder({
    pattern: IPattern,
    ...options,
  });
};

