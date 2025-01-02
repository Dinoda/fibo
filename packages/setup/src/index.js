import AppManager from "./express.js";
import Builder from "./esbuild.js";

const services = {};

const buildAndServe = (app, build, watch = false) => {
  services.app = new AppManager(app);
  services.builder = new Builder(build);

  const pr = watch ? services.builder.watch() : services.builder.build();

  pr.then(() => {
    services.app.start();
  });
};

export default buildAndServe;
