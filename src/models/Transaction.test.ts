import Transaction from './Transaction'
import { ITransactionAttrs, ITransactionPlatform, ITransactionStatus } from '../interfaces/ITransaction'
import ISOCurrencyCode from '../interfaces/ISOCurrencyCode'
import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('Transaction', async (t) => {
  await attemptDatabaseConnection(false)
  
  const attrs = {
    amount: 1000,
    currency: ISOCurrencyCode.GBP,
    platform: ITransactionPlatform.braintree,
    paymentMethod: 'test-payment-method',
    paymentMethodDetails: 'test-payment-method-details',
    status: ITransactionStatus.captured    
  } as ITransactionAttrs

  const transaction = await Transaction.build(attrs).save()

  t.ok(transaction, 'should return transaction')
  t.equal(transaction.amount, attrs.amount, 'should return amount')
  t.equal(transaction.currency, attrs.currency, 'should return currency')
  t.equal(transaction.platform, attrs.platform, 'should return platform')
  t.equal(transaction.paymentMethod, attrs.paymentMethod, 'should return paymentMethod')
  t.equal(transaction.paymentMethodDetails, attrs.paymentMethodDetails, 'should return paymentMethodDetails')
  t.equal(transaction.status, attrs.status, 'should return status')
  
  t.hasProp(transaction, 'createdAt', 'should return createdAt')
  t.hasProp(transaction, 'updatedAt', 'should return updatedAt')
  
  await Transaction.deleteOne({ _id: transaction._id })

  attemptDatabaseDisconnection(false)
  t.end()
})
