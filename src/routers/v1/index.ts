import * as Koa from 'koa';
import paymentsRouter from './payments';
import swaggerRouter from './swagger';

export default (app: Koa) => {
  const BASE_URL = '/v1';
  app.use(paymentsRouter(BASE_URL).routes());
  app.use(swaggerRouter(BASE_URL).routes());
};
