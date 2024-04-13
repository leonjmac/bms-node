import { InvalidRouteError } from './InvalidRouteError'
import { CustomError } from './CustomError'

describe('InvalidRouteError', () => {
  const code = 404
  const e = new InvalidRouteError()
  const message = `The requested path could not be found.`

  it('should create an instance of "InvalidRouteError" which is a subclass of "CustomError"', () => {
    expect(e).toBeInstanceOf(CustomError);
  })

  it('should return 404', () => {
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