import { createRouter } from 'fibo-server';
import { get, post, del, getFile } from '../resolver/sound.js';

import multer from 'multer';

const soundUpload = multer({ dest: 'sounds' });

const router = createRouter();

router.route('/api/sound').get(get);

router.route('/api/sound/:id').get(get).delete(del);


router.post('/api/sound', soundUpload.single('sound'), post)
router.post('/api/sound/:id', soundUpload.single('sound'), post);


router.get('/api/sound/file/:id', getFile);

export default router;
