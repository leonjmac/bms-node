import { BadRequestError } from './BadRequestError'
import { CustomError } from './CustomError'
import { test } from 'tap'

test('BadRequestError', (t) => {
  const message = 'Test error message'
  const e = new BadRequestError(message)

  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, 400, 'should return 400')
  t.equal(e.reason, message, 'should return correct message')
  t.same(e.serializeErrors(), { 
    code: 400, 
    message 
  }, 'should serialize errors')
  t.end()
})
