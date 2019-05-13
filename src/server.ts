import * as Koa from 'koa';
const app = new Koa();

app.use(async (ctx: { body: string; }) => {
  ctx.body = 'Hello World';
});

app.use(async (ctx: { status: any; body: { message: any; }; }, next: () => void) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
})

app.listen(3000);
console.log('Server running on port 3000');
export default app;