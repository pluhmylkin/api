export const ERR_UNATHORIZED = 'ERR_UNATHORIZED';
export const ERR_AUTH_TOKEN_EXPIRED = 'ERR_AUTH_TOKEN_EXPIRED';
export const ERR_VALIDATION = 'ERR_VALIDATION';
export const ERR_CANNOT_APPROVE = 'ERR_CANNOT_APPROVE';
export const ERR_CANNOT_CANCEL = 'ERR_CANNOT_CANCEL';
export const NO_PAYMENT = 'NO_PAYMENT';
export const CONFLICT_PAYMENT = 'CONFLICT_PAYMENT';

export const generateError = (error: string) => {
  let message: string;
  switch (error) {
    case ERR_UNATHORIZED:
      message = 'No auth token provided';
      break;
    case ERR_AUTH_TOKEN_EXPIRED:
      message = 'Auth token expired';
      break;
    case ERR_VALIDATION:
      message = 'Validation failed';
      break;
    // TODO add details
    case ERR_CANNOT_APPROVE:
      message = 'Cannot approve a payment that has already been cancelled';
      break;
    case ERR_CANNOT_CANCEL:
      message = 'Cannot cancel a payment that has already been approved';
      break;
    case NO_PAYMENT:
      message = 'Payment not found';
      break;
    case CONFLICT_PAYMENT:
      message = 'Payment already exist';
      break;
    default:
      message = error;
      break;
  }
  return { error, message };
};
