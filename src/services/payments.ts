import { Body, Controller, Get, Post, Put, Route, SuccessResponse } from 'tsoa';
import { IPayment, IPaymentCreate } from '../models/payments';

/**
 * @description Service for entity payments
 */
@Route('/payments')
export class PaymentsService extends Controller {
  /**
   * @description Returns the list of existing payments.
   */
  @Get()
  public async getPayments(): Promise<IPayment[]> {
    const items: IPayment[] = [
      {
        amount: 1337.01,
        comment: null,
        created: new Date('2018-03-09T11:26:14.805Z'),
        currency: 'RUB',
        id: '99999',
        payeeId: '888888',
        payerId: '7777777',
        paymentMethod: 'PMB',
        paymentSystem: 'yandexMoney',
        status: 'created',
        updated: new Date('2018-03-09T11:31:14.666Z'),
      },
      {
        amount: 1337.01,
        comment: null,
        created: new Date('2018-03-09T11:26:14.805Z'),
        currency: 'RUB',
        id: '99999',
        payeeId: '888888',
        payerId: '7777777',
        paymentMethod: 'PMB',
        paymentSystem: 'yandexMoney',
        status: 'created',
        updated: new Date('2018-03-09T11:31:14.666Z'),
      },
    ];
    return items;
  }

  /**
   * @description Returns an existing payment
   * @param id id of payment
   */
  @Get('{id}')
  public async getPayment(id: string): Promise<IPayment> {
    const items: IPayment = {
      amount: 1337.01,
      comment: null,
      created: new Date('2018-03-09T11:26:14.805Z'),
      currency: 'RUB',
      id: '99999',
      payeeId: '888888',
      payerId: '7777777',
      paymentMethod: 'PMB',
      paymentSystem: 'yandexMoney',
      status: 'created',
      updated: new Date('2018-03-09T11:31:14.666Z'),
    };
    return items;
  }

  /**
   * @description Creates a new payment
   * @param newPayment new payment
   */
  @SuccessResponse('201', 'Created')
  @Post()
  public async createPayment(
    @Body() newPayment: IPaymentCreate
  ): Promise<IPayment> {
    return {
      amount: 1337.01,
      comment: null,
      created: new Date('2018-03-09T11:26:14.805Z'),
      currency: 'RUB',
      id: '99999',
      payeeId: '888888',
      payerId: '7777777',
      paymentMethod: 'PMB',
      paymentSystem: 'yandexMoney',
      status: 'created',
      updated: new Date('2018-03-09T11:31:14.666Z'),
    };
  }

  /**
   * @description Approves a payment, effectively it moves money from a payer account to a payee account.
   */
  @Put('{id}/approve')
  public async approvePayment(id: string): Promise<boolean> {
    return true;
  }
  /**
   * @description Cancels a created payment that hasn’t been approved yet.
   */
  @Put('{id}/cancel')
  public async cancelPayment(id: string): Promise<boolean> {
    const approve = true;
    return !approve;
  }
}
