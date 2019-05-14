import { createLogger, format, transports } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, colorize, printf } = format;

const consoleFormat = printf(
  info => `${info.timestamp} - ${info.level}: ${info.message}`
);

export default (name: string) =>
  createLogger({
    exceptionHandlers: [
      new DailyRotateFile({
        datePattern: 'YYYY-MM-DD-HH',
        filename: `./logs/%DATE%-${name}-exceptions.log`,
      }),
    ],
    format: combine(timestamp(), consoleFormat),
    level: 'info',
    transports: [
      new transports.Console({
        format: combine(timestamp(), colorize(), consoleFormat),
        handleExceptions: true,
        level: 'debug',
      }),
      new DailyRotateFile({
        datePattern: 'YYYY-MM-DD-HH',
        filename: `./logs/%DATE%-${name}-error.log`,
        level: 'error',
      }),
      new DailyRotateFile({
        datePattern: 'YYYY-MM-DD-HH',
        filename: `./logs/%DATE%-${name}.log`,
      }),
    ],
  });
