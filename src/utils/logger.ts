import winston from "winston";
import config from "../config/main";
import { PathMapper } from "../helpers/path-mapper";

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
    level: config.winston.level,
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.File({ filename: PathMapper.resolve("@logs/error.log"), level: "error" }),
        new winston.transports.File({ filename: PathMapper.resolve("@logs/combined.log") })
    ]
});

if(config.env === 'development') {
    logger.add(new winston.transports.Console({
        format: combine(
            timestamp(),
            printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${message}`;
            }),
        )
    }));
}

export default logger;