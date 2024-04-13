import { PayPalRestValidationError } from './PayPalRestValidationError'
import { IPayPalRestValidationError } from '../interfaces/IPayPalRestValidationError'
import { CustomError } from './CustomError'

describe('PayPalRestValidationError', () => {
  const code = 400
  const error = {
    name: 'VALIDATION_ERROR',
    message: 'Test error message',
    debugId: 'test-debug-id',
    details: [
      {
        issue: 'test-issue',
        description: 'test-description'
      }
    ]
  } as IPayPalRestValidationError

  const e = new PayPalRestValidationError(code, error)

  it('should create an instance of "PayPalRestValidationError" which is a subclass of "CustomError"', () => {
    expect(e).toBeInstanceOf(CustomError);
  })

  it('should return 400', () => {
    expect(e).toHaveProperty('statusCode', code)
  })

  it('should return correct message', () => {
    expect(e).toHaveProperty('message', `${error.message}`)
  })

  it('should serialize errors', () => {
    expect(e.serializeErrors()).toMatchObject({
      code,
      message: `${error.name} - ${error.message}\nDebug ID: ${error.debugId}`,
      reasons: error.details
    })
  })
})