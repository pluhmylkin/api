import { Context } from 'koa';
import * as mongoose from 'mongoose';
import { statuses } from '../enums/statuses';
import { ERR_NO_VALID_ID, generateError } from './utils';

const MONGOOSE_CONNECT = 'mongodb://localhost/api';
mongoose.connect(MONGOOSE_CONNECT, { useNewUrlParser: true });

export const db = mongoose.connection;

export const isValidId = (ctx: Context, next) => {
  const { id } = ctx.params;
  if (!id || id.trim() === '' || !mongoose.Types.ObjectId.isValid(id)) {
    ctx.status = statuses.CLIENT_ERROR;
    ctx.body = generateError(ERR_NO_VALID_ID);
  } else {
    return next();
  }
};
