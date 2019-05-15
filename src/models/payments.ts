interface IPaymentBase {
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  comment: string | null;
}

export interface IPaymentCreate extends IPaymentBase {}

export interface IPaymentApprove {}

export interface IPaymentCancel {}

export interface IPayment extends IPaymentBase {
  id: string;
  created: Date;
  updated: Date;
  status: string;
}
