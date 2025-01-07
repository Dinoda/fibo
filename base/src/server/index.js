import { createExpressApp, createRouter } from "fibo-server";

import { idMiddleware, middleware, errorHandler } from "./logging.js";

import router from "./routing/home.js";

global.PROJECT_ROOT = process.argv[1].replace("index.js", "");

export default {
  middlewares: [idMiddleware, middleware],
  routers: [router],
  errorHandlers: [errorHandler]
};
