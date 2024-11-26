/**
 * Middleware to handle 404 error
 */
import { NextFunction, Request, Response } from 'express';
import { jsendFail } from '../utils/jsend';

export default function notFoundMiddleware(
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    res.status(404).json(jsendFail('resource not found'));
}
