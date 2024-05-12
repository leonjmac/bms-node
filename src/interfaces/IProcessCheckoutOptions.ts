import { ITransactionPlatform } from './ITransaction'
import { IBraintreeTransactionOptions } from './IBraintreeOptions'
import { IPayPalClassicOptions } from './IPayPalClassicOptions'
import { IPayPalRestOptions } from './IPayPalRestOptions'
import { IPrimerOptions } from './IPrimerOptions'

export interface IProcessCheckoutOptions {
  platform: ITransactionPlatform
  braintree?: IBraintreeTransactionOptions,
  paypal?: {
    classic: IPayPalClassicOptions,
    rest: IPayPalRestOptions
  },
  primer?: IPrimerOptions
}