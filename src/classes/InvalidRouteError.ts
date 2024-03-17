import { CustomError } from './CustomError'

export class InvalidRouteError extends CustomError {
  statusCode = 404
  reason = 'The requested path could not be found.'

  constructor() {
    super('Code: 404 - The requested path could not be found.')
    Object.setPrototypeOf(this, InvalidRouteError.prototype)
  }

  serializeErrors() {
    return {
      code: this.statusCode,
      message: this.reason
    }
  }
}