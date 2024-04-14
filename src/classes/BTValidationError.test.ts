import { BTValidationError } from './BTValidationError'
import { CustomError } from './CustomError'
import { test } from 'tap'

test('BTValidationError', (t) => {
  const code = 400
  const errors = [{
    attribute: 'test',
    code: 'test',
    message: 'Test error message'
  }]
  const e = new BTValidationError(errors)
  const message = 'One or more parameter validations failed.'

  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, code, 'should return 400')
  t.equal(e.message, message, 'should return correct message')
  t.same(e.serializeErrors(), { 
    code, 
    message: 'One or more parameter validations failed.',
    reasons: [{
      code: 'test',
      message: 'Test error message',
      field: 'test'
    }]
  }, 'should serialize errors')  
  t.end()
})
