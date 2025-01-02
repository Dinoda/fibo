import { createExpressApp } from "fibo-server";

const def = {
  port: process.env.PORT ?? 1342,
  static: process.env.STATIC_DIRECTORY ?? "public"
};

export default class AppManager {
  constructor(app) {
    if ("app" in app && "start" in app) {
      this.app = app;
    } else {
      this.app = createExpressApp({
        ...def,
        ...app
      });
    }
  }

  start() {
    this.app.start();
  }
}
