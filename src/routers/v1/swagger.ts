import { Context } from 'koa';
import * as Router from 'koa-router';
import { statuses } from '../../models/statuses';

export default (baseUrl: string) => {
  const router = new Router({ prefix: `${baseUrl}` });
  router.get('/swagger.json', async (ctx: Context) => {
    const swaggerDocument = require('../../../swagger/swagger.json');
    ctx.status = statuses.SUCCESS;
    ctx.type = 'application/json';
    ctx.body = swaggerDocument;
  });
  return router;
};
