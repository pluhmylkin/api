import * as Koa from 'koa';

import createLogger from './logger';
import routers from './routers/v1';

const app = new Koa();
const logger = createLogger('server');
const port = 3000;

routers(app);

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

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
