/**
 * Morgan HTTP request logger middleware for express
 */
import morgan from 'morgan';
import { logger } from '../../utils/logger';

const httpLoggerMiddleware = morgan(
    ':status :method - :url - :remote-addr - :response-time ms',
    {
        stream: {
            write: (message: string) => logger.info(`🌏 ${message.trim()}`),
        },
    },
);

export default httpLoggerMiddleware;
