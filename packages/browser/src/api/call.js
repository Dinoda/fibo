//import progressCall from "./progressCall.js";
//

/**
 * Simply resolves the optional parameter "options", to allow the "cb" callback to be used without it.
 *
 * @internal
 * @param object options The options of the call (optional)
 * @param callable cb The callback
 * @return array A pair of [options, cb]
 */
const resolveParams = (options, cb) => {

  if (typeof options == 'function') {
    return [{}, options];
  }

  return [options, cb];
};

/**
 * Set the header inside the fetch "options" object.
 *
 * @internal
 * @param object options The fetch options
 * @param string key The key of the header
 * @param string value The value of the header
 * @return -
 */
const setHeader = (options, key, value) => {
  if (! options.headers) {
    options.headers = {};
  }

  options.headers[key] = value;
};

/**
 * Returns a GET callable for the call
 *
 * @internal
 * @param string url The url to call
 * @param object options The fetch options
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
const getCall = (url, options, cb) => {
  return (data = null) => {
    let u = url;
    if (data) {
      u += '?' + new URLSearchParams(data).toString();
    }
    const pr = fetch(u, options);

    if (cb) {
      pr.then(d => cb(null, d)).catch(e => cb(e));
    }

    return pr;
  };
};

/**
 * Returns a GET callable for the call
 *
 * @internal
 * @param string url The url to call
 * @param object options The fetch options
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
const postCall = (url, options, cb) => {
  return (data) => {
    const pr = fetch(url, {
      ...options,
      body: data,
      });

    if (cb) {
      pr.then(d => cb(null, d)).catch(e => cb(e));
    }

    return pr;
  };
};

/**
 * The standard callable
 *
 * @param string url The url to call
 * @param string method The method of the call. Available for now: "GET", "POST", "DELETE" (case insensitive)
 * @param object options The options of the fetch call
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
const call = (url, method = 'GET', options = {}, cb = null) => {
  method = method.toUpperCase();

  [options, cb] = resolveParams(options, cb);

  options.method = method;

  switch(method) {
    case 'POST': 
      return postCall(url, options, cb);
      break;
    case 'GET':
    case 'DELETE':
      return getCall(url, options, cb);
      break;
  }

  throw new Error(`Unknown method for your call "${method}", couldn't create a callable`);
};

/**
 * Returns a json enabled call.
 * The body of this call will be a json object.
 *
 * @param string url The url to call
 * @param object options The options of the fetch ("Content-Type" header will be set automatically)
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
export const jsonCall = (url, options = {}, cb = null) => {
  [options, cb] = resolveParams(options, cb);

  setHeader(options, 'Content-Type', 'application/json');

  return (data) => {
    call(url, 'POST', options, cb)(JSON.stringify(data));
  };
};

/**
 * Return a standard form fetch.
 *
 * @param string url The url to call
 * @param object options The options of the fetch ("Content-Type" header will be set automatically)
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
export const formCall = (url, options = {}, cb = null) => {
  [options, cb] = resolveParams(options, cb);

  setHeader(options, 'Content-Type', 'application/x-www-form-urlencoded');

  return call(url, 'POST', options, cb);
};

/**
 * Returns a binary enabled fetch.
 * Enable the capacity to send binary data (e.g. files).
 *
 * @param string url The url to call
 * @param object options The options of the fetch ("Content-Type" header will be set automatically)
 * @param callable cb The callback on the fetch result. Format: 
 *    (err, response) => {}
 * @return callable The prepared call. Format:
 *    (data) => {}: Promise<Response>
 */
export const binaryCall = (url, options = {}, cb = null) => {
  [options, cb] = resolveParams(options, cb);

  // Fetch automatically sets this
  //setHeader(options, 'Content-Type', 'multipart/form-data');

  return call(url, 'POST', options, cb);
};

export default call;

