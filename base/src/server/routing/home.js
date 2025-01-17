import { createRouter } from "fibo-server";
import {
  get,
  getOne,
  getMeta,
  post,
  postUpdate as update
} from "../resolver/home.js";
import express from "express";

const router = createRouter({
  middlewares: [
    // Add middlewares specific of this router
  ]
});

router.route("/api/work/meta").get(getMeta);

router
  .route("/api/work")
  .get(get)
  .post(express.json(), post);

router
  .route("/api/work/:id")
  .get(getOne)
  .post(express.json(), update);
export default router;
