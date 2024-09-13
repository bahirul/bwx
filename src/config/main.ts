export default {
    /**
     * Application configuration section
     * 
     * 
     * @param env: string - environment mode of the application (development | production)
     * @param port: number - port number of the application
     * @param host: string - host of the application
     */
    env: 'development',
    port: 51000,
    host: 'localhost',

    /**
     * winston logging configuration
     *
     * @param level: string - logging level (error, warn, info, http, verbose, debug, silly)
     */
    winston: {
        level: 'debug',
    }
}