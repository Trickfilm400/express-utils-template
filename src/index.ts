import { App, Config, dbConfig, logger } from '@kopf02/express-utils';
//Convict config
new Config(dbConfig('mongodb', 'rest-api'));

import { router } from './routes';

logger.level = 'silly';
const app = new App(router);

if (process.env.NODE_ENV !== 'test') {
  logger.info('Trying to connect to database...');
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
   *  Mysql.createAppDataSource({
        synchronize: true, // or false in production
        entities: [], //array of typeorm Entities
      });
      Mysql.getAppDataSource()
        .initialize()
        .then((res) => {
          app.init();
          app.getServer().set('etag', false);
          app.listen();
        });

      @example Mysql.getAppDataSource() returns the datasource for typeorm => Mysql.getAppDataSource().getRepository(<entity>)
   */
  //endregion
} else {
  app.init();
  app.listen();
}
