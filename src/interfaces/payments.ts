import { prop, Typegoose } from 'typegoose';
import { PaymentStatuses } from '../enums/statuses';

class IPaymentBase extends Typegoose {
  @prop({ required: true })
  public payeeId: string;
  @prop({ required: true })
  public payerId: string;
  @prop({ required: true })
  public paymentSystem: string;
  @prop({ required: true })
  public paymentMethod: string;
  @prop({ required: true })
  public amount: number;
  @prop({ required: true })
  public currency: string;
  @prop()
  public comment?: string;
}

export interface IPaymentCreate extends IPaymentBase {}

// tslint:disable-next-line: max-classes-per-file
export class IPayment extends IPaymentBase {
  @prop({ default: new Date() })
  public created: Date;
  @prop()
  public id: string;
  @prop({ default: new Date() })
  public updated: Date;
  @prop({ enum: PaymentStatuses, default: 'created' })
  public status: string;
}

export const PaymentModel = new IPayment().getModelForClass(IPayment);
