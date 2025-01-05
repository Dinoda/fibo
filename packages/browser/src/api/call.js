import progressCall from "./progressCall.js";

/**
 * @param url The url of the call
 * @param method The method of the call
 * @param data The data of the call
 * @param options The options
 * @param cb The callback once called
 */
const call = (url, method, data, options, cb = null) => {
  if (typeof options == "function") {
    cb = options;
    options = null;
  }

  const pr = fetch(url);

  if (cb) {
    pr.then(d => {
      cb(null, d);
    }).catch(err => {
      cb(err);
    });
  }

  return pr;
};

export default call;
