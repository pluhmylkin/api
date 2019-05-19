import * as convict from 'convict';

const SCHEMA = {
  dbname: {
    default: 'api',
    doc: 'Name of datebase in mongodb',
    env: 'DBNAME',
    format: String,
  },
  env: {
    default: 'local',
    doc: 'The application environment.',
    env: 'NODE_ENV',
    format: ['local'],
  },
  mongodb: {
    default: 'mongodb://localhost:27030/',
    doc: 'Mongo connection string',
    env: 'MONGODB',
    format: String,
  },
  port: {
    default: 3000,
    doc: 'Port of server',
    env: 'PORT',
    format: Number,
  },
};

export default () => {
  const conf = convict(SCHEMA);
  conf.validate();
  return conf;
};
