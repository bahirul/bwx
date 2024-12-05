import { Request, Response } from 'express';
import { jsendSuccess } from '../../../utils/jsend';

// GET /
export const getMainAction = async (req: Request, res: Response) => {
    res.json(
        jsendSuccess({
            message: 'hello world',
        }),
    );
};
