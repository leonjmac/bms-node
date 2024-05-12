import { test } from 'tap'
import sinon from 'sinon'
import { Method } from 'axios';

import { PayPalRestValidationError } from '../../../src/classes/PayPalRestValidationError'
import { performRestRequest, __configurePayPalOrderRequest as configurePayPalOrderRequest } from'../PayPal//PPRestAPIController'

import ISOCurrencyCode from '../../interfaces/ISOCurrencyCode';
import { IOrderStatus } from '../../interfaces/IOrder';

const obj = {
  paypalRest: performRestRequest
};

test('PPRestAPIController - peformRequest function - Success', async (t) => {
  // Mocking the API call using sinon
  const performRequestStub = sinon.stub()
  const expectedResponse = { 
    status: 201,
    data: {
      intent: 'CAPTURE',
      purchase_units: [
          {
              amount: {
                  currency_code: 'USD',
                  value: '100.00'
              }
          }
      ]
    }
  }

  performRequestStub.resolves(expectedResponse);
  
  // Replace the actual paypalRest function with the stub
  sinon.replace(obj, 'paypalRest', performRequestStub) 

  try {
      // Call the function
      const options = {
        method: 'POST' as Method,
        path: '/v2/checkout/orders',
        data: {
          order: {
            reference: 'test',
            total: 100.00,
            items: [
              {
                description: 'test',
                quantity: 1,
                sku: 'test',
                currencyCode: 'USD',
                totalPrice: 100.00
              }
            ]
          }
        },
        idempotent: true
      }
      const order = await obj.paypalRest(options)

      // Assert that the function returned the created order
      t.equal(order, expectedResponse, 'Should return the created order')
  } catch (error) {
      // Assert that no error occurred
      t.error(error, 'Should not throw an error');
  } finally {
      // Restore the original axios function
      sinon.restore()
  }

  t.end()
})

test('PPRestAPIController - peformRequest function - Error', async (t) => {
  // Mocking the API call using sinon
  const performRequestStub = sinon.stub()
  const expectedError = new PayPalRestValidationError(400, {
    name: 'VALIDATION_ERROR',
    code: 400,
    message: 'Test error message',
    debugId: 'test-debug-id',
    details: [
      {
        issue: 'test-issue',
        description: 'test-description'
      }
    ]
  });

  performRequestStub.rejects(expectedError);
  
  // Replace the actual paypalRest function with the stub
  sinon.replace(obj, 'paypalRest', performRequestStub) 

  try {
      // Call the function
      const options = {
        method: 'POST' as Method,
        path: '/v2/checkout/orders',
        data: {
          order: {
            reference: 'test',
            total: 100.00,
            items: [
              {
                description: 'test',
                quantity: 1,
                sku: 'test',
                currencyCode: 'USD',
                totalPrice: 100.00
              }
            ]
          }
        },
        idempotent: true
      }
      await obj.paypalRest(options)

      // Assert that the function returned the created order
      t.fail('Should throw an error');
  } catch (error) {
      // Assert that no error occurred
      t.equal(error, expectedError, 'Should throw a PayPalRestValidationError error');
  } finally {
      // Restore the original axios function
      sinon.restore()
  }

  t.end()
})

test('PPRestAPIController - configurePayPalOrderRequest function', async (t) => {
  // Call the function
  const data = {
    intent: 'AUTHORIZE',
    order: {
      reference: 'test',
      total: 200,
      items: [
        {
          id: 'test1',
          description: 'test1',
          quantity: 1,
          sku: 'test1',
          currencyCode: ISOCurrencyCode.GBP,
          baseUnitPrice: 100,
          totalPrice: 100
        },
        {
          id: 'test2',
          description: 'test2',
          quantity: 2,
          sku: 'test2',
          currencyCode: ISOCurrencyCode.GBP,
          baseUnitPrice: 50,
          totalPrice: 100
        }
      ],
      status: IOrderStatus.created
    }
  }

  const order = configurePayPalOrderRequest(data)

  // Assert that the function returned the correct order
  t.same(order, {
    intent: 'AUTHORIZE',
    purchase_units: [
        {
            reference_id: 'test',
            amount: {
                currency_code: 'GBP',
                value: '200'
            },
            items: [
              {
                name: 'test1',
                quantity: 1,
                sku: 'test1',
                unit_amount: {
                  currency_code: 'GBP',
                  value: '100'
                }
              },
              {
                name: 'test2',
                quantity: 2,
                sku: 'test2',
                unit_amount: {
                  currency_code: 'GBP',
                  value: '100'
                }
              }
            ]
        }
    ]
  }, 'Should return the correct order')

  t.end()
})
