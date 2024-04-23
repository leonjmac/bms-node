import { ITransactionPlatform } from './ITransaction'
import { IBraintreeOptions } from './IBraintreeOptions'
import { IPayPalClassicOptions } from './IPayPalClassicOptions'
import { IPayPalRestOptions } from './IPayPalRestOptions'
import { IPrimerOptions } from './IPrimerOptions'

export interface ISetupCheckoutOptions {
  platform: ITransactionPlatform
  braintree?: IBraintreeOptions,
  paypal?: {
    classic: IPayPalClassicOptions,
    rest: IPayPalRestOptions
  },
  primer?: IPrimerOptions
}