import { Request, Response } from "express";
import Jsend from "../helpers/jsend";

const notFoundMiddleware = (req: Request, res: Response) => {
    return res.status(404).send(Jsend.error({
        message: "resource not found",
        code: 404
    }));
};

export default notFoundMiddleware;