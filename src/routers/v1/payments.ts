import * as Router from 'koa-router';
import {
  approvePaymentController,
  cancelPaymentController,
  createPaymentController,
  getPaymentController,
  getPaymentsController,
} from '../../controllers/payments';

export default (baseUrl: string) => {
  const router = new Router({ prefix: `${baseUrl}/payments` });
  router.get('/', getPaymentsController);
  router.get('/:id', getPaymentController);
  router.post('/', createPaymentController);
  router.put('/:id/approve', approvePaymentController);
  router.put('/:id/cancel', cancelPaymentController);
  return router;
};
