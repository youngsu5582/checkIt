import mongoose from'mongoose';

import User from '#schema/user.js';
import Doctor from '#schema/doctor.js';
import History from '#schema/history.js';
import { logger } from '#config/logger.js';

const {MONGO_ID, MONGO_PW,MONGO_OPTION} = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PW}@${MONGO_OPTION}`;


export default ()=>{

    mongoose.set("debug", (collectionName, method,docs) => {
        logger.info(`${collectionName}.${method} ${Object.keys(docs)}`);
    });

    const connect = ()=>{mongoose.connect(
        MONGO_URL,
        {
            dbName:'checkit',
        }
    ,(err)=>{
        if(err)console.log('Mongo Connect Error');
        else console.log('MongoDB Connected!');
    })
    }
    connect();
    User();
    Doctor();
    History();
};