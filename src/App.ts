import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import { BraintreeGraphQLController } from './controllers/BraintreeGraphQL/BraintreeGraphQLController'
import { BraintreeTransactionController } from './controllers/BraintreeSDK/BTTransactionController'

import { ClientSessionController } from './controllers/Primer/ClientSessionController'
import { PaymentMethodsController } from './controllers/Primer/PaymentMethodsController'
import { PaymentsController } from './controllers/Primer/PaymentsController'

import { InvalidRouteError } from './classes/InvalidRouteError'

import { errorHandler } from './middlewares/error-handler'
import { StorefrontController } from './controllers/Storefront/StorefrontController'

const app = express()
app.use(cors())
app.use(express.json())

// BRAINTRREE ROUTES
app.use('/braintree/graphql', BraintreeGraphQLController)
app.use('/braintree/transaction', BraintreeTransactionController)

// PRIMER ROUTES
app.use('/primer/client-session', ClientSessionController)
app.use('/primer/payment-methods', PaymentMethodsController)
app.use('/primer/payments', PaymentsController)

// STOREFRONT ROUTES
app.use('/storefront', StorefrontController)

// GENERIC ERROR HANDLER FOR UNMATCHED ROUTES
app.use('*', () => {
  throw new InvalidRouteError()
})

app.use(errorHandler)

export default app