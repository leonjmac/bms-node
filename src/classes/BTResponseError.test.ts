import { BTResponseError } from './BTResponseError'
import { CustomError } from './CustomError'
import { Transaction, ValidatedResponse } from 'braintree'
import { test } from 'tap'

test('BTResponseError', (t) => { 
  // @ts-ignore
  const e = new BTResponseError({ 
    success: false,
    transaction: {
      status: 'test-status',
      processorResponseCode: 'test-processor-response-code',
      processorResponseText: 'test-processor-response-text'
    },
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

  // Provides coverage for line 17 of src/classes/BTResponseError.ts
  const e2 = new BTResponseError({
    success: false,
    customer: {},
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
      reason: {
        status: 'test-status',
        responseCode: 'test-processor-response-code',
        responseText: 'test-processor-response-text'
      }
    }]
  }, 'should serialize errors')
  t.same(e.error.errors.deepErrors(), [{
    attribute: 'test',
    code: 'test',
    message: 'Test error message'
  }], 'should contain deep errors')
  
  t.ok(e2 instanceof CustomError, 'should be instance of CustomError')
  t.equal(e2.statusCode, 400, 'should return 400')  
  t.same(e2.serializeErrors(), { 
    code: 400, 
    message: 'One or more parameter validations failed.',
    reasons: [{
      reason: undefined
    }]
  }, 'should serialize errors')
  t.same(e2.error.errors.deepErrors(), [{
    attribute: 'test',
    code: 'test',
    message: 'Test error message'
  }], 'should contain deep errors')
  t.end()
})
