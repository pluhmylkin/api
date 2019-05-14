import * as Koa from 'koa';
import createLogger from './logger';

const app = new Koa();
const logger = createLogger('server');

app.use(async ctx => {
  ctx.body = 'Hello World';
});

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
