import { configureParams, executeRequest as paypalClassic } from '../../helpers/PPClassicAPIClient'
import { executeRequest as primer } from '../../helpers/PrimerAPIClient'
import { ITransactionPlatform } from '../../interfaces/ITransaction'

import { gateway } from '../../helpers/BTGatewayClient'
import { performRequest as btGQLRequest, performChainedRequest as btGQLChainedRequest } from '../../helpers/BTGraphQLClient'
import { generateClientToken } from '../BraintreeSDK/BTAuthorizationController'
import { performRestRequest } from '../PayPal/PPRestAPIController'
import { BadRequestError } from '../../classes/BadRequestError'

import { ISetupCheckoutOptions } from '../../interfaces/ISetupCheckoutOptions'
import { IProcessCheckoutOptions } from '../../interfaces/IProcessCheckoutOptions'

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

      case ITransactionPlatform.hyperwallet:
        // TODO: Implement Hyperwallet
        break

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
        return await primer({
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

const createTransaction = async (options: IProcessCheckoutOptions) => {
  try {
    switch (options.platform) {
      case ITransactionPlatform.adyen:
        break

      case ITransactionPlatform.braintree:
        // Check if the request is for Braintree
        if(options.braintree === undefined) throw new BadRequestError('Invalid Braintree request.')

        // Check if the request is for Braintree GraphQL
        if(options.braintree.useGraphQL) {
          if(options.braintree.chainedRequest !== undefined) {
            return await btGQLChainedRequest(options.braintree.chainedRequest)
          }
          return await btGQLRequest(
            options.braintree.query,
            {
              ...options.braintree.variables,
              orderId: options.orderId
            }
          )
        } else {
          return await gateway.transaction.sale({
            ...options.braintree.transaction!,
            orderId: options.orderId
          })
        }
        
      case ITransactionPlatform.paypal:
        break

      case ITransactionPlatform.primer:
        if(options.primer === undefined) throw new BadRequestError('Invalid Primer request.')
        return await primer({
          ...options.primer
        })

      case ITransactionPlatform.stripe:
        break

      default:
        /// Do nothing

    }
  } catch (err) {

  }
}

export { setupCheckout, createTransaction }