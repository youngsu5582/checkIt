import express from 'express';
const router = express.Router();
import userRouter from'#route/user.js';
import authRouter from '#route/auth.js';
import doctorRouter from'#route/doctor.js';
import stdRouter from '#route/std.js';

/* GET home page. */
router.get('/test',(req, res)=>{
  res.status(200).json({"data":""});
});

router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/doctor',doctorRouter);
router.use('/std',stdRouter);
export default router;
