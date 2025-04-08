import { createRouter } from 'fibo-server';
import { get, post, del } from '../resolver/episode.js';

const router = createRouter();

router.route('/api/episode').get(get).post(post);

router.route("/api/episode/:id").get(get).post(post).delete(del);

export default router;
