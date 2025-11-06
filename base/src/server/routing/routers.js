import { createRouter } from "fibo-server";
import { PageRouterBuilder } from 'fibo-html-component-ssr';

import router from './home.js';

const routerBld = new PageRouterBuilder('.page', createRouter());

await routerBld.initialize();

export default [
  router, 
  routerBld.getRouter(),
];
