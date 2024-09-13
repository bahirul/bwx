import express, { Application } from "express";
import config from "../config/main";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "../utils/logger";

/**
 * App class to create and configure the express application
 */
class App {
    public app: Application;

    constructor() {
        this.app = express();
        this._registerMiddlewares();
    }

    private _registerMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    public start() {
        this.app.listen(config.port, () => {
            logger.info(`✅ server started at http://${config.host}:${config.port}`);
        });
    }
}

export default new App();