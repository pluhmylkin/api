// file contain functions for every payments route

import { Context } from 'koa';
import { IPayment } from '../models/payments';
import { statuses } from '../models/statuses';
import { PaymentsService } from '../services/payments';
import {
  CONFLICT_PAYMENT,
  ERR_CANNOT_APPROVE,
  ERR_CANNOT_CANCEL,
  generateError,
  NO_PAYMENT,
} from '../utils/error';

const paymentService = new PaymentsService();

export const getPaymentsController = async (ctx: Context) => {
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
    const payment = await paymentService.getPayment(ctx.params.id);
    if (payment) {
      ctx.status = statuses.SUCCESS;
      ctx.body = payment;
    } else {
      ctx.status = statuses.NO_CONTENT;
      ctx.body = generateError(NO_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(error);
  }
};

export const createPaymentController = async (ctx: Context) => {
  try {
    const newPayment = await paymentService.createPayment(ctx.body as IPayment);
    if (newPayment) {
      ctx.status = statuses.CREATED;
      ctx.body = newPayment;
    } else {
      ctx.status = statuses.CONFLICT;
      ctx.body = generateError(CONFLICT_PAYMENT);
    }
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(error);
  }
};

export const approvePaymentController = async (ctx: Context) => {
  try {
    await paymentService.approvePayment(ctx.params.id);
    ctx.status = statuses.SUCCESS;
    ctx.body = '';
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(ERR_CANNOT_APPROVE);
  }
};

export const cancelPaymentController = async (ctx: Context) => {
  try {
    await paymentService.cancelPayment(ctx.params.id);
    ctx.status = statuses.SUCCESS;
    ctx.body = '';
  } catch (error) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(ERR_CANNOT_CANCEL);
  }
};
