/**
 * This middleware is used to catch malformed request errors like invalid JSON body request.
 */
import { NextFunction, Request, Response } from 'express';
import { jsendFail } from '../utils/jsend';

interface MalformedError extends Error {
    expose: boolean;
    statusCode: number;
    status: number;
    body: string;
    type: string;
}

export default function malformedMiddleware(
    err: MalformedError,
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    // catch 400 error code
    if (err.statusCode === 400) {
        res.status(400).send(jsendFail('malformed request'));
    }

    next(err); // if it's not a 400, let the default error handling do it.
}
