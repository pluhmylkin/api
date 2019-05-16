import { Document } from 'mongoose';
import { prop, Typegoose } from 'typegoose';
import { PaymentStatuses } from '../enums/statuses';

class IPaymentBase extends Typegoose {
  @prop({ required: true })
  private payeeId: string;
  @prop({ required: true })
  private payerId: string;
  @prop({ required: true })
  private paymentSystem: string;
  @prop({ required: true })
  private paymentMethod: string;
  @prop({ required: true })
  private amount: number;
  @prop({ required: true })
  private currency: string;
  @prop({ required: true })
  private comment: string;
}

export interface IPaymentCreate extends IPaymentBase {}

// tslint:disable-next-line: max-classes-per-file
export class IPayment extends IPaymentBase {
  @prop({ required: true })
  private created: Date;
  @prop({ required: true })
  private id: string;
  @prop({ required: true })
  private updated: Date;
  @prop({ required: true, enum: PaymentStatuses })
  // tslint:disable-next-line: variable-name
  private _status: string = 'created';

  get status(): string {
    return this._status;
  }
  set status(theStatus: string) {
    this._status = theStatus;
  }
}

export interface IPaymentApprove {}

export interface IPaymentCancel {}

export const PaymentModel = new IPayment().getModelForClass(IPayment);
