import { CustomError } from './CustomError'
import { IPayPalRestValidationError } from '../interfaces/IPayPalRestValidationError'

export class PayPalRestValidationError extends CustomError {
  statusCode: number;
  constructor(code: number, private error: IPayPalRestValidationError) {
    super(error.message)
    this.statusCode = code
    this.error = error
    Object.setPrototypeOf(this, PayPalRestValidationError.prototype)
  }

  serializeErrors() {
      return {
        code: this.statusCode,
        message: `${this.error.name} - ${this.error.message}\nDebug ID: ${this.error.debugId}`,
        reasons: this.error.details?.map(err => {
          return {
            issue: err.issue,
            description: err.description
          }
        })
      }
  }
}