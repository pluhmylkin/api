import * as Koa from 'koa';
const app = new Koa();

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
console.log('Server running on port 3000');
