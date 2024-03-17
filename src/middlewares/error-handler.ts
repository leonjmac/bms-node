import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../classes/CustomError'
import { AppLogger, AppLoggerLevel } from './app-logger'

export const errorHandler = (err: CustomError, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    AppLogger(AppLoggerLevel.ERROR, err.message)
    return res.status(err.statusCode).send({
      errors: err.serializeErrors()
    })
  }

  // Fail safe to catch non-custom errors
  return res.status(400).send({
    message: 'An unexpected error occurred.',
    detail: err
  })
}
