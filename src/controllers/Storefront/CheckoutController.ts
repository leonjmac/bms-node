import { configureParams, executeRequest as paypalClassic } from '../../helpers/PPClassicAPIClient'
import { executeRequest as primer } from '../../helpers/PrimerAPIClient'
import { IInvoiceAttrs } from '../../interfaces/IInvoice'
import { IOrderAttrs } from '../../interfaces/IOrder'
import { ITransactionPlatform } from '../../interfaces/ITransaction'

import { generateClientToken } from '../BraintreeSDK/BTAuthorizationController'
import { performRestRequest } from '../PayPal/PPRestAPIController'
import { BadRequestError } from '../../classes/BadRequestError'

import { ISetupCheckoutOptions } from '../../interfaces/ISetupCheckoutOptions'

const setupCheckout = async (options: ISetupCheckoutOptions) => {
  try {
    switch (options.platform) {
      case ITransactionPlatform.adyen:
        // TODO: Implement Adyen
        break

      case ITransactionPlatform.braintree:
        // Check if the request is for Braintree
        if(options.braintree === undefined) throw new BadRequestError('Invalid Braintree request.')
        return await generateClientToken({
          ...options.braintree
        })

      case ITransactionPlatform.paypal:
        // Check if the request is for PayPal REST API
        if(options.paypal?.rest !== undefined) {
          return await performRestRequest({
            ...options.paypal.rest
          })
        }

        // Check if the request is for PayPal Classic API
        if(options.paypal?.classic !== undefined) {
          return await paypalClassic(configureParams({
            ...options.paypal.classic
          }))
        }

        // If neither REST nor Classic API is requested, throw an error
        throw new BadRequestError('Invalid PayPal API request.')

      case ITransactionPlatform.primer:
        // Check if the request is for Primer
        if(options.primer === undefined) throw new BadRequestError('Invalid Primer request.')
        return await primer( {
          ...options.primer
        })

      case ITransactionPlatform.stripe:
        // TODO: Implement Stripe
        break

      default:
        /// Do nothing
    }
  } catch (err) {
    throw err
  }
}

const createTransaction = async (platform: ITransactionPlatform, data?: IInvoiceAttrs | IOrderAttrs) => {
  try {
    switch (platform) {
      case ITransactionPlatform.adyen:
        break

      case ITransactionPlatform.braintree:
        break

      case ITransactionPlatform.paypal:
        break

      case ITransactionPlatform.primer:
        break

      case ITransactionPlatform.stripe:
        break

      default:
        /// Do nothing

    }
  } catch (err) {

  }
}

export { setupCheckout, createTransaction }