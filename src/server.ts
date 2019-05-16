import * as Koa from 'koa';

// tslint:disable-next-line: no-var-requires
const koaSwagger = require('koa2-swagger-ui');

import { db } from './helpers/mongoose';
import createLogger from './logger';
import routers from './routers/v1';

const app = new Koa();
const logger = createLogger('server');
const port = 3000;

db.on('error', err => logger.error(`MongoDB connection error:${err}`));
// router first version
routers(app);

// logger for every request
app.use(async (ctx, next) => {
  await next();
  logger.info(`path: ${ctx.path} method: ${ctx.method} status: ${ctx.status}`);
});

// setup swagger
try {
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/v1/swagger.json',
      },
    })
  );
} catch (err) {
  logger.error('Unable to run swagger, err:', err);
}
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
