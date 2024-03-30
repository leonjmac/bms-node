import { createLogger, format, transports } from 'winston'

export enum AppLoggerLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  VERBOSE = 'verbose',
  DEBUG = 'debug'
}

const log = (level: AppLoggerLevel, message: string) => {
  createLogger({
    level,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'bms-node' },
    transports: [
      new transports.Console({ 
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      }),
      new transports.File({ filename: `logs/${level}.log`, level })
    ],
  }).log({
    level,
    message
  })
}

export { log as AppLogger }
