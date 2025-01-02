import progressCall from './progressCall.js';
const call = (url, method, data, options, cb = null) => {
  if (typeof options == "function") {
    cb = options;
    options = null;
  }

  if (options.progress) {
    
  }

  fetch(url
};

export default call;
