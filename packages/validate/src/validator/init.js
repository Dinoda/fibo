import * as typeValidators from "../typing.js";

function stof(s) {
  if (!typeValidators[s]) {
    throw new Error(`Unknown type validator "${s}"`);
  }
  return typeValidators[s];
}

function string(param) {
  const matches = param.match(/\(([^\(\)]+)\)/);

  const lex = [];

  let s = "";

  for (const c of param) {
    switch (c) {
      case "(":
      case ")":
      case "|":
      case "&":
        if (s) {
          lex.push(stof(s));
          s = "";
        }
        switch (c) {
          case "(":
            lex.push("(");
            break;
          case ")":
            lex.push(")");
            break;
          case "|":
            lex.push("|");
            break;
          case "&":
            lex.push("&");
            break;
        }
        break;
      default:
        s += c;
    }
  }

  console.log(lex);
}

function object(param, depth, maxDepth) {
  if (depth >= maxDepth) {
    throw new Error(
      `Unexpected object at depth "${depth}", max depth: "${maxDepth}"`
    );
  }

  const res = {};

  for (const key in param) {
    res[key] = direct(param[key], depth + 1, maxDepth);
  }

  return res;
}

function direct(param, depth, maxDepth) {
  if (typeof param == "function") {
    return param;
  }
  if (typeValidators.object(param)) {
    return object(param, depth, maxDepth);
  }
  if (typeValidators.string(param)) {
    return string(param);
  }

  throw new Error(`Can't manage parameter `);
}

export default (params, maxDepth) => {
  return direct(params, 0, maxDepth);
};
