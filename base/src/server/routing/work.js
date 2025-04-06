import { createRouter } from 'fibo-server';
import { get, post, del } from '../resolver/work.js';

const router = createRouter();

router.route("/api/work").get(get).post(post);

router.route("/api/work/:id").get(get).post(post).delete(del);

export default router;
