export interface IBraintreeOptions {
  merchantAccount?: string
  customerId?: string
  useGraphQL?: boolean
}

export interface IBraintreeTransactionOptions {
  useGraphQL?: boolean
  // For SDK usage
  transaction?: braintree.TransactionRequest,
  // For GraphQL usage
  query?: any
  variables?: any
  chainedRequest?: any[]
}