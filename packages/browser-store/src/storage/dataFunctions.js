import Validator, { types as v } from "fibo-validate";
import { call as brwCall } from "fibo-browser";

export const urlValidator = new Validator({
  get: "!string",
  getOne: "string",
  create: "string",
  update: "string",
  delete: "string"
});

export const optValidator = new Validator({
  meta: "object"
});

export const call = (url, method, data) => {
  const pr = brwCall(url, method, data);

  pr.catch(err => {
    console.error(`Failure on call "${url}": ${err}`);
  });

  return pr.then(resp => resp.json());
};

const urlRegex = /:[\w\d_]+/g;

export function initUrls(urls) {
  for (const key in urls) {
    const url = urls[key];

    if (typeof url == "string") {
      const matches = url.match(urlRegex);

      urls[key] = {
        base: url,
        params: matches ? matches.map(m => m.slice(1)) : []
      };
    }
  }

  return urls;
}

export function resolveUrl(url, data) {
  let res = url.base;

  for (const p of url.params) {
    res = res.replace(":" + p, data[p]);
  }

  return res;
}

export function getValidator(meta) {
  const vld = {};
  for (const k in meta) {
    const m = meta[k];

    if (v.string(m) || v.callable(m)) {
      vld[k] = m;
    } else if (m.validator) {
      vld[k] = m.validator;
    }
  }

  return new Validator(vld);
}
