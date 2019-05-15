import { Context } from 'koa';
import * as Router from 'koa-router';

enum statuses {
  SUCCESS = 200,
  CREATED = 201,
  CLIENT_ERROR = 400,
  UNATHORIZED = 401,
  SERVER_ERROR = 500,
}

export default (baseUrl: string) => {
  const router = new Router({ prefix: `${baseUrl}/payments` });
  router.get('/', async (ctx: Context) => {
    ctx.status = statuses.SUCCESS;
    ctx.body = 'Returns the list of existing payments';
  });
  router.get('/:id', async (ctx: Context) => {
    ctx.status = statuses.SUCCESS;
    ctx.body = 'Returns an existing payment';
  });
  router.post('/', async (ctx: Context) => {
    ctx.status = statuses.CREATED;
    ctx.body = 'Creates a new payment';
  });
  router.put('/', async (ctx: Context) => {
    ctx.body = 'Payments put';
  });
  router.put('/:id/approve', async (ctx: Context) => {
    ctx.status = statuses.SUCCESS;
    ctx.body =
      'Approves a payment, effectively it moves money from a payer account to a payee account.';
  });
  router.put('/:id/cancel', async (ctx: Context) => {
    ctx.status = statuses.SUCCESS;
    ctx.body = 'Cancels a created payment that hasn’t been approved yet.';
  });
  return router;
};
