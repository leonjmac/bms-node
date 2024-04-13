import { BadRequestError } from './BadRequestError'
import { CustomError } from './CustomError'

describe('BadRequestError', () => {
  const message = 'Test error message'
  const e = new BadRequestError(message)
  
  it('should create an instance of "BadRequestError" which is a subclass of "CustomError"', () => {
    expect(e).toBeInstanceOf(CustomError);
  })

  it('should return 400', () => {
    expect(e).toHaveProperty('statusCode', 400)
  })

  it('should return correct message', () => {
    expect(e).toHaveProperty('reason', message)
  })

  it('should serialize errors', () => {
    expect(e.serializeErrors()).toMatchObject({
      code: 400,
      message
    })
  })
})
