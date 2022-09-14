import express from 'express';
const router = express.Router();

import {isLogin} from '#middleware/authenticate.js';
import {getDoctor,Doctorlist} from '#controller/doctor.js';


router.get('/list',isLogin,Doctorlist);
router.get('',isLogin,getDoctor);
export default router;