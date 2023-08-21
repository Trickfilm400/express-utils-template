import { createRouter, RouteInterface } from '@kopf02/express-utils';
import {
  IndexController,
  IndexHealthCheckController,
  IndexVersionController,
} from '../controllers/index.controller';

export const routes: RouteInterface = {
  path: '/',
  controller: new IndexController(),
  children: [
    {
      path: '/version',
      controller: new IndexVersionController(),
    },
    {
      path: '/health',
      controller: new IndexHealthCheckController(),
    },
  ],
};

export const router = createRouter({ routes: [routes] });
