import { BadRequestError } from './BadRequestError'
import { CustomError } from './CustomError'

const message = 'Test error message'
const e = new BadRequestError(message)

test('BadRequestError should return 400', () => {  
  expect(e).toHaveProperty('statusCode', 400)
})

test('BadRequestError should return correct message', () => {  
  expect(e).toHaveProperty('reason', message)
})

test('BadRequestError should be an instance of "BadRequestError"', () => {  
  expect(e).toBeInstanceOf(CustomError)
})

test('BadRequestError should serialize errors', () => { 
  expect(e.serializeErrors()).toMatchObject({
    code: 400,
    message
  })
})
