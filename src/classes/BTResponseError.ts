import { ValidatedResponse } from 'braintree'
import { CustomError } from './CustomError'

export class BTResponseError<T> extends CustomError {
  statusCode: number = 400
  error: ValidatedResponse<T>

  constructor(error: ValidatedResponse<T>) {
    super(error.message)
    this.error = error
    Object.setPrototypeOf(this, BTResponseError.prototype)
  }

  serializeErrors() {
      let reason

      if(this.error.transaction.status !== undefined) {
        reason = {
          status: this.error.transaction.status,
          responseCode: this.error.transaction.processorResponseCode,
          responseText: this.error.transaction.processorResponseText
        }
      }

      return {
        code: this.statusCode,
        message: this.message,
        reasons: [{reason}]
      }
    }
}