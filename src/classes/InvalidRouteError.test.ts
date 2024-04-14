import { InvalidRouteError } from './InvalidRouteError'
import { CustomError } from './CustomError'
import { test } from 'tap'

test('InvalidRouteError', (t) => {
  const code = 404
  const e = new InvalidRouteError()
  const message = `The requested path could not be found.`

  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, code, 'should return 404')
  t.equal(e.message, `Code: ${code} - ${message}`, 'should return correct message')
  t.same(e.serializeErrors(), { 
    code, 
    message 
  }, 'should serialize errors')
  t.end()
})
