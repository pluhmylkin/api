import * as mongoose from 'mongoose';

const MONGOOSE_CONNECT = 'mongodb://localhost/api';
mongoose.connect(MONGOOSE_CONNECT, { useNewUrlParser: true });

export const db = mongoose.connection;
