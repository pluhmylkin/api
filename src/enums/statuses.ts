export enum statuses {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  CLIENT_ERROR = 400,
  UNATHORIZED = 401,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export enum PaymentStatuses {
  CREATED = 'created',
  CANCELED = 'canceled',
  APPROVED = 'approved',
}
