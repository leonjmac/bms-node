import { setupCheckout } from './CheckoutController'
import { ISetupCheckoutOptions } from '../../interfaces/ISetupCheckoutOptions'
import { test } from 'tap'
import { ITransactionPlatform } from '../../interfaces/ITransaction'

test('setupCheckout', async (t) => {
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