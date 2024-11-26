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

    // jwt configuration
    jwt: {
        algo: process.env.JWT_ALGO || 'HS256',
        secret: process.env.JWT_SECRET || 'randomSecretOf32CharsPleaseChange',
    },

    // auth expiration
    auth: {
        expiration: {
            token: parseInt(process.env.AUTH_TOKEN_EXP || '300'), // 5 minutes
            refresh: parseInt(process.env.AUTH_REFRESH_EXP || '86400'), // 1 day
        },
    },

    // log configuration
    log: {
        level: process.env.LOG_LEVEL || 'info',
    },

    // redis configuration
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || '',
    },
};

export default appConfig;
