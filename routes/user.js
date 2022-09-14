import express from 'express';
const router = express.Router();

import {signup,withdrawal} from '#controller/user.js';

router.post('/reg', signup);

router.post('/unreg',withdrawal);

export default router;