import braintree, { BraintreeGateway } from 'braintree'
import '../../env'

const gateway = new BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  publicKey: `${process.env.BRAINTREE_PUBLIC_KEY}`,
  privateKey: `${process.env.BRAINTREE_PRIVATE_KEY}`,
  merchantId: `${process.env.BRAINTREE_MERCHANT_ID}`
 })

 const oauthGateway = new BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  clientId: `${process.env.BRAINTREE_OAUTH_CLIENT_ID}`,
  clientSecret: `${process.env.BRAINTREE_OAUTH_CLIENT_SECRET}`
 })

 export { gateway, oauthGateway }