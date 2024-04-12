import { BTResponseError } from './BTResponseError'
import { ValidatedResponse } from 'braintree'
import { CustomError } from './CustomError'

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
  message: 'Test error message' } as ValidatedResponse<any>)

describe('BTResponseError', () => {
  it('should create an instance of BTResponseError', () => {
    
    expect(error).toBeInstanceOf(CustomError);
  })
})