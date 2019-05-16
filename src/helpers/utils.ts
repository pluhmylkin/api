import { IDetail } from '../interfaces/detail';
import { IError } from '../interfaces/errors';

export const ERR_UNATHORIZED = 'ERR_UNATHORIZED';
export const ERR_AUTH_TOKEN_EXPIRED = 'ERR_AUTH_TOKEN_EXPIRED';
export const ERR_VALIDATION = 'ERR_VALIDATION';
export const ERR_CANNOT_APPROVE = 'ERR_CANNOT_APPROVE';
export const ERR_CANNOT_CANCEL = 'ERR_CANNOT_CANCEL';
export const ERR_NO_PAYMENT = 'ERR_NO_PAYMENT';
export const ERR_CONFLICT_PAYMENT = 'ERR_CONFLICT_PAYMENT';
export const ERR_NO_VALID_ID = 'ERR_NO_VALID_ID';

export const generateError = (code: string, details?: IDetail[]): IError => {
  let message: string;
  switch (code) {
    case ERR_UNATHORIZED:
      message = 'No auth token provided';
      break;
    case ERR_AUTH_TOKEN_EXPIRED:
      message = 'Auth token expired';
      break;
    case ERR_VALIDATION:
      message = 'Validation failed';
      break;
    case ERR_CANNOT_APPROVE:
      message = 'Cannot approve a payment that has already been cancelled';
      break;
    case ERR_CANNOT_CANCEL:
      message = 'Cannot cancel a payment that has already been approved';
      break;
    case ERR_NO_PAYMENT:
      message = 'Payment not found';
      break;
    case ERR_CONFLICT_PAYMENT:
      message = 'Payment already exist';
      break;
    case ERR_NO_VALID_ID:
      message = 'Your id not valid';
      break;
    default:
      message = code;
      code = 'Unknow error';
      break;
  }

  return details ? { code, message, details } : { code, message };
};

export const validationError = (err): IError => {
  const details = [];
  Object.keys(err.errors).forEach(error => {
    let { value } = err.errors[error].properties;
    const { message, path } = err.errors[error].properties;
    value = value ? value : `${value}`; // if value undefined, you'll not see it
    details.push({ message, path, value });
  });
  return generateError(ERR_VALIDATION, details as IDetail[]);
};
