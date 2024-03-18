import { ValidationError } from 'braintree'
import { CustomError } from './CustomError'

export class BTValidationError extends CustomError {
  statusCode: number = 400
  message = 'One or more parameter validations failed.'

  constructor(private errors: ValidationError[]) {
    super('One or more parameter validations failed.')
    this.errors = errors
    Object.setPrototypeOf(this, BTValidationError.prototype)
  }

  serializeErrors() {
    return {
      code: this.statusCode,
      message: this.message,
      reasons: this.errors.map(error => {
        return {
          code: error.code,
          message: error.message,
          field: error.attribute
        }
      })
    }
  }
}