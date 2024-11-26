/**
 * App configuration
 */
import * as dotenv from 'dotenv';
import { getAlias } from '../utils/path-alias';
dotenv.config({
    path: getAlias('@root/.env'),
});

const appConfig = {
    // app configuration
    env: process.env.NODE_ENV || 'development',
    id: process.env.APP_ID || 'app',
    port: parseInt(process.env.APP_PORT || '3000'),

    // log configuration
    log: {
        level: process.env.LOG_LEVEL || 'info',
    },
};

export default appConfig;
