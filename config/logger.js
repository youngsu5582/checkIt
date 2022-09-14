import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs';
const {combine,timestamp,printf} = winston.format;
const logFormat = printf(info =>{
    return `${info.timestamp} ${info.level} : ${info.message}`;
});

const logger = winston.createLogger({
    format : combine(
        timestamp({
            format:'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // info log
        new winstonDaily({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir,
          filename: `%DATE%.log`,
          maxFiles: 30,  // 30일치 로그 파일 저장
          zippedArchive: true, 
        }),
        // error log
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
      exceptionHandlers:[
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
         }),
      ],
})
logger.stream = {// morgan 연결
  write: message => {
      logger.info(message);
  }
} 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  
        winston.format.simple(), 
      )
    }));
  }

export {logger};
  
