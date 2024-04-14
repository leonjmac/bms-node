import { DatabaseConnectionError } from './DatabaseConnectionError'
import { CustomError } from './CustomError'
import { test } from 'tap'

test('DatabaseConnectionError', (t) => {
  const code = 500
  const e = new DatabaseConnectionError()
  const message = `A problem occurred when attempting to connect to the database.`
  
  t.ok(e instanceof CustomError, 'should be instance of CustomError')
  t.equal(e.statusCode, code, 'should return 500')
  t.equal(e.message, `Code: ${code} - ${message}`, 'should return correct message')
  t.same(e.serializeErrors(), { 
    code, 
    message 
  }, 'should serialize errors')
  t.end()
})
