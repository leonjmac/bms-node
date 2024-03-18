import { CustomError } from './CustomError'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(public reason: string) {
    super(`Code: 400 - ${reason}`)
    this.reason = reason
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors() {
    return {
      code: this.statusCode,
      message: this.reason
    }
  }
}
