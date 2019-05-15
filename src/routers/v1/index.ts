import * as Koa from 'koa';
import paymentsRouter from './payments';

export default (app: Koa) => {
  const BASE_URL = '/v1';
  app.use(paymentsRouter(BASE_URL).routes());
};
