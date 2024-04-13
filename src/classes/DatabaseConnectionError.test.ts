import { DatabaseConnectionError } from './DatabaseConnectionError'
import { CustomError } from './CustomError'

describe('DatabaseConnectionError', () => {
  const code = 500
  const e = new DatabaseConnectionError()
  const message = `A problem occurred when attempting to connect to the database.`
  
  it('should create an instance of "DatabaseConnectionError" which is a subclass of "CustomError"', () => {
    expect(e).toBeInstanceOf(CustomError);
  })

  it('should return 500', () => {
    expect(e).toHaveProperty('statusCode', code)
  })

  it('should return correct message', () => {
    expect(e).toHaveProperty('message', `Code: ${code} - ${message}`)
  })

  it('should return correct reasons', () => {
    expect(e.serializeErrors()).toMatchObject({
      code,
      message
    })
  })
})