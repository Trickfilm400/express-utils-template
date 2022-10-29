import {
  App,
  Config,
  dbConfig,
  IDbConfig,
  logger,
} from '@kopf02/express-utils';
//Convict config
export type CustomConvictConfig = IDbConfig;
new Config(dbConfig('mongodb', 'rest-api'));

import indexRoute from './routes/index.route';

logger.level = 'silly';
const app = new App(new indexRoute());
let dataSource: any; //todo

if (process.env.NODE_ENV !== 'test') {
  logger.info('Trying to connect to database...');
  //todo DB Connection
  /**
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
} else {
  app.init();
  app.listen();
}

export { dataSource };
