import { BTResponseError } from './BTResponseError'
import { CustomError } from './CustomError'
import { Transaction, ValidatedResponse } from 'braintree'
import { test } from 'tap'

test('BTResponseError', (t) => {
  const e = new BTResponseError({ 
    success: false,
    transaction: {},
    errors: {
      deepErrors: () => {
        return [{
          attribute: 'test',
          code: 'test',
          message: 'Test error message'
        }]
      }
    },
    message: 'One or more parameter validations failed.' 
  } as ValidatedResponse<Transaction>)

  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, 400, 'should return 400')  
  t.same(e.serializeErrors(), { 
    code: 400, 
    message: 'One or more parameter validations failed.',
    reasons: [{
      reason: undefined
    }]
  }, 'should serialize errors')
  t.same(e.error.errors.deepErrors(), [{
    attribute: 'test',
    code: 'test',
    message: 'Test error message'
  }], 'should contain deep errors')
  t.end()
})
