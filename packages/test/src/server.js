import { createExpressApp, createRouter } from "fibo-server";
import {
  getLogger,
  getTransports,
  getRequestIdMiddleware,
  getMiddleware
} from "fibo-logging";

process.env.PROJECT_ROOT = process.argv[1].replace("/index.js", "");

const router = createRouter();

router.get("/api", (req, res) => {
  req.logger.debug("Nawak");
  req.logger.info("Another one");
  res.send("Heyo ??!!");
});

router.get('/error', (req, res) => {
  throw new Error('Error test');
});

const transports = getTransports({
  console: "debug"
});

const app = createExpressApp({
  port: 1432,
  middlewares: [
    (req, res, next) => {
      console.log("Yeah");
      // For your own middlewares, remember to always call "next" after your code
      next();
    },
    getRequestIdMiddleware(getLogger("info", transports)),
    getMiddleware({
      transports: transports
    })
  ],
  routers: router,
  static: "public"
});

app.start();
