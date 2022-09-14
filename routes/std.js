import express from 'express';
const router = express.Router();

import {stdReservation} from '#controller/doctor.js';
import {isLogin} from '#middleware/authenticate.js';



router.post('/reg',isLogin,stdReservation);
export default router;