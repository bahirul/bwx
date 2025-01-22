/**
 * Logger for the application
 */
import winston from 'winston';
import appConfig from '../config/app';
import { getAlias } from './path-alias';

const { combine, timestamp, printf } = winston.format;

const timestampFormat = 'DD/MMM/YYYY HH:mm:ss';

// Winston colorize
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'white',
});

export const logger = winston.createLogger({
    level: appConfig.log.level,
    format: combine(
        winston.format.colorize(),
        timestamp({ format: timestampFormat }),
        printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        }),
    ),
    transports: [
        new winston.transports.File({
            filename: getAlias('@logs/error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: getAlias('@logs/app.log'),
        }),
        new winston.transports.Console({
            format: combine(
                timestamp({ format: timestampFormat }),
                printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}] ${message}`;
                }),
            ),
        }),
    ],
});
