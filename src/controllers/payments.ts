// file contain functions for every payments route

import { Context } from 'koa';
import { statuses } from '../enums/statuses';
import {
  ERR_CANNOT_APPROVE,
  ERR_CANNOT_CANCEL,
  ERR_CONFLICT_PAYMENT,
  ERR_NO_PAYMENT,
  generateError,
  validationError,
} from '../helpers/utils';
import { IPayment } from '../interfaces/payments';
import { PaymentsService } from '../services/payments';

const paymentService = new PaymentsService();

export const getPaymentsController = async (ctx: Context): Promise<void> => {
  try {
    const payments = await paymentService.getPayments();
    ctx.status = statuses.SUCCESS;
    ctx.body = payments;
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(error);
  }
};

export const getPaymentController = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const payment = await paymentService.getPayment(id);

    if (payment) {
      ctx.status = statuses.SUCCESS;
      ctx.body = payment;
    } else {
      ctx.status = statuses.CLIENT_ERROR;
      ctx.body = generateError(ERR_NO_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(error);
  }
};

export const createPaymentController = async (ctx: Context): Promise<void> => {
  try {
    const newPayment = await paymentService.createPayment(ctx.request
      .body as IPayment);
    if (newPayment) {
      ctx.status = statuses.CREATED;
      ctx.body = newPayment;
    } else {
      ctx.status = statuses.CONFLICT;
      ctx.body = generateError(ERR_CONFLICT_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    if (error.name === 'ValidationError') {
      ctx.body = validationError(error);
    } else {
      ctx.body = generateError(error);
    }
  }
};

export const approvePaymentController = async (ctx: Context): Promise<void> => {
  try {
    const { id } = ctx.params;
    const existPayment = await paymentService.approvePayment(id);
    if (existPayment) {
      ctx.status = statuses.SUCCESS;
      ctx.body = '';
    } else {
      ctx.status = statuses.CLIENT_ERROR;
      ctx.body = generateError(ERR_NO_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(ERR_CANNOT_APPROVE);
  }
};

export const cancelPaymentController = async (ctx: Context): Promise<void> => {
  try {
    const { id } = ctx.params;
    const existPayment = await paymentService.cancelPayment(id);
    if (existPayment) {
      ctx.status = statuses.SUCCESS;
      ctx.body = '';
    } else {
      ctx.status = statuses.CLIENT_ERROR;
      ctx.body = generateError(ERR_NO_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(ERR_CANNOT_CANCEL);
  }
};
