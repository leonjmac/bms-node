import LocalPayment from './LocalPayment'
import { ILocalPaymentAttrs, ILocalPaymentReferenceType, ILocalPaymentStatus } from '../interfaces/ILocalPayment'
import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('LocalPayment', async (t) => {
  await attemptDatabaseConnection(false)
  const attrs = {
    referenceId: 'test-reference-id',
    referenceType: ILocalPaymentReferenceType.order,
    status: ILocalPaymentStatus.pending,
    merchantAccountId: 'test-merchant-account-id'
  } as ILocalPaymentAttrs

  const localPayment = await LocalPayment.build(attrs).save()

  t.ok(localPayment, 'should return localPayment')
  t.equal(localPayment.referenceId, attrs.referenceId, 'should return referenceId')
  t.equal(localPayment.referenceType, attrs.referenceType, 'should return referenceType')
  t.equal(localPayment.status, attrs.status, 'should return status')
  t.equal(localPayment.merchantAccountId, attrs.merchantAccountId, 'should return merchantAccountId')
  t.hasProp(localPayment, 'createdAt', 'should return createdAt')
  t.hasProp(localPayment, 'updatedAt', 'should return updatedAt')
  
  await LocalPayment.deleteOne({ _id: localPayment._id })
  attemptDatabaseDisconnection(false)
  t.end()
})