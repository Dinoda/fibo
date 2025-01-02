import { createRouter } from "fibo-server";
import { get } from '../resolver/home.js';

const router = createRouter({
  middlewares: [
    // Add middlewares specific of this router
  ]
});

router.route("/api").get(get);

export default router;
