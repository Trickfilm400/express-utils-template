import { App, Config, dbConfig, logger } from '@kopf02/express-utils';
//Convict config
new Config(dbConfig('mongodb', 'rest-api'));

import { router } from './routes';

//set log level to "silly" for dev environment, but not for production to prevent logging issues
if (Config.getConfig().get('env') !== 'production') logger.level = 'silly';
//the default in the logger object is 'info', so we need to set the configured value here, that the loglevel is set correctly
else logger.level = Config.getConfig().get('loglevel');

export class ExpressServer {
  private app: App;

  constructor(start = true) {
    if (start) this.init();
  }

  /**
   * Main Server Startup Function
   * @param cb - Callback function if database is connected
   */
  init(cb?: (err?: unknown) => void) {
    this.app = new App(router);
    this.app.initializeHttpServer();
    // this.app.setCorsOptions({
    //   origin: Config.getConfig<ICorsConfig>().get('cors.origin'),
    // });
    //logger.info('Trying to connect to database...');
    /** without any database or so */
    this.app.init(Config.getConfig().get('ssl'));
    this.app.getServer().set('etag', false);
    this.app.listen(Config.getConfig().get('port'));
    cb?.();
    //region DB Connection
    /** MONGOOSE:
     * mongoose
     *     .connect(getMongoConnectionString(), { authSource: 'admin' })
     *     .then((res) => {
     *       //AppDataSource.initialize().then((_r) => {
     *       app.afterMiddlewares(new MaintenanceMiddleware(false).ExpressMiddleWare);
     *       app.init();
     *       app.getServer().set('etag', false);
     *       app.listen();
     *       dataSource = res;
     *     });
     */
    /** MYSQL (typeorm):
         Mysql.createAppDataSource({
         synchronize: true, // or false in production
         logging: false,
         entities: [], //array of typeorm Entities
         });
         Mysql.getAppDataSource()
         .initialize()
         .then(() => {
         this.app.init();
         this.app.getServer().set('etag', false);
         this.app.listen(Config.getConfig().get('port'));
         cb?.();
         })
         .catch((e) => {
         logger.error('Error while connection to DB');
         logger.error(e);
         cb?.(e);
         });
         //endregion

         @example Mysql.getAppDataSource() returns the datasource for typeorm => Mysql.getAppDataSource().getRepository(<entity>)
         */
    //endregion
  }

  end = (signal: string) => {
    logger.info(`Processing Signal: ${signal}`);
    // try {
    //   //await Mysql.getAppDataSource().destroy();
    // } catch (e) {
    //   /* no error handling */
    // }
    this.app.close();
  };
}

//start server if not in test environment
if (Config.getConfig().get('env') !== 'test') {
  const server = new ExpressServer();

  process.on('SIGINT', server.end);
  process.on('SIGTERM', server.end);
}
