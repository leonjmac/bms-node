import { CustomError } from './CustomError'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'A problem occurred when attempting to connect to the database.'

  constructor() {
    super('Code: 500 - A problem occurred when attempting to connect to the database.')
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return {
      code: this.statusCode,
      message: this.reason
    }
  }
}