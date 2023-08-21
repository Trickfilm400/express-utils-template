import { IRoute, NextFunction, Request, Response } from 'express';
import IndexService from '../services/IndexService';
import { IHealthCheck, IVersion } from '../interfaces/IndexService.interface';
import { HTTPResponse, RouterController } from '@kopf02/express-utils';

export class IndexVersionController implements RouterController {
  public IndexService = new IndexService();
  initializeRoutes(router: IRoute): void {
    router.get(this.version);
  }
  public version = (
    _req: Request,
    res: Response<HTTPResponse<IVersion>>,
    next: NextFunction
  ) => {
    try {
      res.json({ data: this.IndexService.version() });
    } catch (error) {
      next(error);
    }
  };
}

export class IndexHealthCheckController implements RouterController {
  public IndexService = new IndexService();
  initializeRoutes(router: IRoute): void {
    router.get(this.healthCheck);
  }
  /**
   * Return some health information, especial for the docker healthcheck
   * @author Nico
   * @param _req
   * @param res
   * @param _next
   * @version 1
   * @since 11.06.2021 23:12
   */
  public healthCheck = (
    _req: Request,
    res: Response<HTTPResponse<IHealthCheck>>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    res.json({ data: this.IndexService.healthCheck() });
  };
}

export class IndexController implements RouterController {
  public IndexService = new IndexService();
  initializeRoutes(router: IRoute): void {
    router.get(this.index);
  }
  public index = (_req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json({ data: null });
    } catch (error) {
      next(error);
    }
  };
}
