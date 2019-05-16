import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { PaymentStatuses } from '../enums/statuses';
import { ERR_CANNOT_APPROVE, ERR_CANNOT_CANCEL } from '../helpers/utils';
import { IPayment, IPaymentCreate, PaymentModel } from '../interfaces/payments';

/**
 * @description Service for entity payments
 */
@Route('/payments')
export class PaymentsService extends Controller {
  /**
   * @description Returns the list of existing payments.
   */
  @Tags('Payments')
  @Get()
  public async getPayments(): Promise<IPayment[]> {
    const items: IPayment[] = await PaymentModel.find();
    return items;
  }

  /**
   * @description Returns an existing payment
   * @param id id of payment
   */
  @Tags('Payments')
  @Get('{id}')
  public async getPayment(id: string): Promise<IPayment> {
    return PaymentModel.findOne({ _id: id });
  }

  /**
   * @description Creates a new payment
   * @param newPayment new payment
   */
  @SuccessResponse('201', 'Created')
  @Tags('Payments')
  @Post()
  public async createPayment(
    @Body() newPayment: IPaymentCreate
  ): Promise<IPayment> {
    const newP = new PaymentModel(newPayment);
    newP.save();
    return newP;
  }

  /**
   * @description Approves a payment, effectively it moves money from a payer account to a payee account.
   */
  @Tags('Payments')
  @Put('{id}/approve')
  public async approvePayment(id: string): Promise<boolean> {
    const payment = await PaymentModel.findOne({ _id: id });
    if (payment) {
      if (payment.status !== PaymentStatuses.CANCELED) {
        payment.status = PaymentStatuses.APPROVED;
        payment.save();
        return true;
      } else {
        throw new Error(ERR_CANNOT_APPROVE);
      }
    }
    return false;
  }
  /**
   * @description Cancels a created payment that hasn’t been approved yet.
   */
  @Tags('Payments')
  @Put('{id}/cancel')
  public async cancelPayment(id: string): Promise<boolean> {
    const payment = await PaymentModel.findOne({ _id: id });
    if (payment) {
      if (payment.status !== PaymentStatuses.APPROVED) {
        payment.status = PaymentStatuses.CANCELED;
        payment.save();
        return true;
      } else {
        throw new Error(ERR_CANNOT_CANCEL);
      }
    }
    return false;
  }
}
