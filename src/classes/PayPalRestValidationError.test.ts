import { PayPalRestValidationError } from './PayPalRestValidationError'
import { IPayPalRestValidationError } from '../interfaces/IPayPalRestValidationError'
import { CustomError } from './CustomError'
import { test } from 'tap'

test('PayPalRestValidationError', (t) => {
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

  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, code, 'should return 400')
  t.equal(e.message, `${error.message}`, 'should return correct message')
  t.same(e.serializeErrors(), { 
    code, 
    message: `${error.name} - ${error.message}\nDebug ID: ${error.debugId}`,
    reasons: error.details
  }, 'should serialize errors')
  t.end()
})
