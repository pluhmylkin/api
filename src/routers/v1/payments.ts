import * as Router from 'koa-router';
import {
  approvePaymentController,
  cancelPaymentController,
  createPaymentController,
  getPaymentController,
  getPaymentsController,
} from '../../controllers/payments';
import { isValidId } from '../../helpers/mongoose';

export default (baseUrl: string) => {
  const router = new Router({ prefix: `${baseUrl}/payments` });
  router.get('/', getPaymentsController);
  router.get('/:id', isValidId, getPaymentController);
  router.post('/', createPaymentController);
  router.put('/:id/approve', isValidId, approvePaymentController);
  router.put('/:id/cancel', isValidId, cancelPaymentController);
  return router;
};
