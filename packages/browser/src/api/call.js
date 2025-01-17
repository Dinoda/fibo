//import progressCall from "./progressCall.js";

/**
 * A call method, used to simplify calls with a general tool.
 *
 * @param url The url of the call
 * @param method The method of the call (default to "GET")
 * @param data The data of the call, which will be sent as "application/json" for now
 * @param options The options (optional):
 *  - No value for now
 *
 * @param cb The callback after the promise was resolved, either use this or use the promise returned.
 * Callback signature: (error, response) => {}
 *
 * @return The fetch promise
 */
const call = (url, method = "GET", data = null, options = {}, cb = null) => {
  if (typeof options == "function") {
    cb = options;
    options = {};
  }

  options.method = method.toUpperCase();

  switch (options.method) {
    case "POST":
      options.headers = {
        "Content-Type": "application/json"
      };
      options.body = JSON.stringify(data);
      break;
  }

  const pr = fetch(url, options);

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
