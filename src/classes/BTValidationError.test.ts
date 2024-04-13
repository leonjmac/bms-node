import { BTValidationError } from './BTValidationError'
import { CustomError } from './CustomError'

describe('BTValidationError', () => {
  const code = 400
  const errors = [{
    attribute: 'test',
    code: 'test',
    message: 'Test error message'
  }]
  const e = new BTValidationError(errors)
  const message = 'One or more parameter validations failed.'
  
  it('should create an instance of "BTValidationError" which is a subclass of "CustomError"', () => {
    expect(e).toBeInstanceOf(CustomError);
  })

  it('should return 400', () => {
    expect(e).toHaveProperty('statusCode', code)
  })

  it('should return correct message', () => {
    expect(e).toHaveProperty('message', message)
  })

  it('should return correct reasons', () => {
    expect(e.serializeErrors()).toMatchObject({
      code,
      message,
      reasons: [{
        code: 'test',
        message: 'Test error message',
        field: 'test'
      }]
    })
  })
})