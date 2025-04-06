import express from 'express';

import { createExpressApp, createRouter } from "fibo-server";
import { JWTMiddleware } from 'fibo-user-auth-jwt/server';

import { idMiddleware, middleware, errorHandler } from "./logging.js";

import router from './routing/home.js';
import workRouter from './routing/work.js';

global.PROJECT_ROOT = process.argv[1].replace("index.js", "");

export default {
  middlewares: [express.json(), idMiddleware, middleware, JWTMiddleware({ secret: "abcdef" })],
  routers: [router, workRouter],
  errorHandlers: [errorHandler],
};

