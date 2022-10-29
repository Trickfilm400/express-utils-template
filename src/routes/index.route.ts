import IndexController from '../controllers/index.controller';
import { AbstractRoute } from '@kopf02/express-utils';

class IndexRoute extends AbstractRoute {
  public path = '/';

  initializeRoutes() {
    const indexController = new IndexController();
    this.router.get(`/`, indexController.index);
    this.router.get(`/version`, indexController.version);
    this.router.get(`/health`, indexController.healthCheck);
  }
}

export default IndexRoute;
