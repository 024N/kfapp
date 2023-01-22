import winston from 'winston';

const {splat, combine, printf} = winston.format;

export const customLogFormat = printf(({level, message, meta}) => {
  const cleanMessage = message.replace(/\n/g, '');
  return `>>> KFAPP --- ${level} --- ${cleanMessage}${
    meta ? '--- ' + JSON.stringify(meta) : ''
  } <<<`;
});

const consoleLog = new winston.transports.Console({
  format: combine(splat(), customLogFormat),
  handleExceptions: true,
});

const defaultLogOptions = {
  exitOnError: false,
  transports: [consoleLog], //, errorLogFile, allLogFile
};

winston.configure(defaultLogOptions);
export const log = {
  debug: winston.debug,
  error: winston.error,
  info: winston.info,
  // setLoggerOptions,
  verbose: winston.verbose,
  warn: winston.warn,
};
