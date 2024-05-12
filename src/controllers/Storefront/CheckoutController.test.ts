import { setupCheckout } from './CheckoutController'
import { ISetupCheckoutOptions } from '../../interfaces/ISetupCheckoutOptions'
import { test } from 'tap'
import { ITransactionPlatform } from '../../interfaces/ITransaction'

test('setupCheckout - Braintree', async (t) => {
  const braintreeOptions = {
    platform: ITransactionPlatform.braintree,
    braintree: {
      useGraphQL: false,
      merchantAccountId: 'macpay_EUR',
    }
  } as ISetupCheckoutOptions
  
  t.hasProp(await setupCheckout(braintreeOptions), 'token', 'should return generateClientToken')
  t.end()
})

test('setupCheckout - PayPal REST API', async (t) => {
  const paypalRestOptions = {
    platform: ITransactionPlatform.paypal,
    paypal: {
      rest: {
        method: 'GET',
        path: '/v2/checkout/orders/{id}',
        idempotent: false,
      }
    }
  } as ISetupCheckoutOptions

  t.hasProp(await setupCheckout(paypalRestOptions), 'status', 'should return status of order')
  t.end()
})

test('setupCheckout - PayPal Classic API', async (t) => {
  const paypalClassicOptions = {
    platform: ITransactionPlatform.paypal,
    paypal: {
      classic: {
        method: 'GetBalance',
        data: {
          'RETURNALLCURRENCIES': 0
        }
      }
    }
  } as ISetupCheckoutOptions

  t.hasProp(await setupCheckout(paypalClassicOptions), 'L_AMT0', 'should return balance amount.')
  t.end()
})