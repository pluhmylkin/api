import * as Koa from 'koa';

import createLogger from './logger';
import router from './routers';

const app = new Koa();
const logger = createLogger('server');

app.use(router.routes());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

app.listen(3000);
logger.info('Server running on port 3000');
