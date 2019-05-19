import { Context } from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';
import { statuses } from '../../enums/statuses';

export default (baseUrl: string) => {
  const router = new Router({ prefix: `${baseUrl}` });
  router.get('/swagger.json', async (ctx: Context) => {
    const swaggerPath = path.resolve(
      __dirname,
      '..',
      '..',
      'swagger',
      `swagger.json`
    );
    const swaggerDocument = require(swaggerPath);
    ctx.status = statuses.SUCCESS;
    ctx.type = 'application/json';
    ctx.body = swaggerDocument;
  });
  return router;
};
