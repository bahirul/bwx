import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import appConfig from './config/app';
import httpLoggerMiddleware from './middlewares/http-logger';
import notFoundMiddleware from './middlewares/not-found';
import mainRoutes from './modules/main/main-routes';
import { logger } from './utils/logger';

// create express app
const app = express();
const port = appConfig.port;

// middlewares
app.use(httpLoggerMiddleware);
app.use(express.json());
app.use(
    cors({
        credentials: true, // enable credentials for cookies
        origin: true, // allow all origins
    }),
);
app.use(helmet());

// register routes
app.use('/', mainRoutes);

// not found (404) middleware
app.use(notFoundMiddleware);

// error handler
app.use((err: Error, req: Request, res: Response) => {
    logger.error({
        action: 'errorHandler',
        message: (err as Error)?.message,
        stack: appConfig.env === 'development' ? (err as Error)?.stack : null,
    });

    res.status(500).json({
        status: 'error',
        message: 'internal server error',
    });
});

// start server
app.listen(port, () => {
    logger.info(`✅ server listen on port ${port}`);
});
