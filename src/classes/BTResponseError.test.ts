import { BTResponseError } from './BTResponseError'
import { ValidatedResponse } from 'braintree'
import { CustomError } from './CustomError'

describe('BTResponseError', () => {
  const error = new BTResponseError({ 
    success: true,
    errors: {
      deepErrors: () => {
        return [{
          attribute: 'test',
          code: 'test',
          message: 'Test error message'
        }]
      }
    },
    message: 'Test error message' 
  } as ValidatedResponse<any>)

  it('should create an instance of BTResponseError', () => {    
    expect(error).toBeInstanceOf(CustomError);
  })
  
  it('should contain deep errors', () => {
    expect(error.error.errors.deepErrors()).toMatchObject([{
      attribute: 'test',
      code: 'test',
      message: 'Test error message'
    }])
  })
})