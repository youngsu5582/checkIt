import express from 'express';
import './env.js';
import helmet from 'helmet';
import methodoverride from 'method-override';
import morgan from 'morgan';


import versionRouter from './routes/version.js';
import connect from './schemas/index.js';
import {logger} from './config/logger.js';


const app = express();
connect();

app.use(helmet());
app.use(express.json());
app.use(methodoverride());


const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' 
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined;
console.log('Logger Format : ' + morganFormat);
app.use(morgan(morganFormat, {stream : logger.stream}));


app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.use('/v3', versionRouter);

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
  });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'Port Open!');
}); 