import Invoice from './Invoice'
import Customer from './Customer'
import { IInvoiceAttrs, IInvoiceStatus } from '../interfaces/IInvoice'

import ISOCurrencyCode from '../interfaces/ISOCurrencyCode'
import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('Invoice', async (t) => {
  await attemptDatabaseConnection(false)
  const address = {
    number: 'test-number',
    street: 'test-street',
    town: 'test-town',
    locality: 'test-city',
    postalCode: 'test-postcode',
    country: 'test-country',
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    countryCode: 'GB',
    default: true
  }

  const customer = await Customer.build({
    forename: 'test-customer-forename',
    surname: 'test-customer-surname',
    email: 'test-customer-email'
  }).save()

  const attrs = {
    reference: 'test-reference-id',
    customer: customer._id,
    billingAddress: address,
    shippingAddress: address,
    items: [
      {
        sku: 'test-sku',
        quantity: 1,
        baseUnitPrice: 10000,
        currencyCode: ISOCurrencyCode.GBP
      }
    ],
    total: 10000,
    status: IInvoiceStatus.draft
  } as IInvoiceAttrs

  const invoice = await Invoice.build(attrs).save()

  t.ok(invoice, 'should return invoice')
  t.equal(invoice.reference, attrs.reference, 'should return reference')
  t.equal(invoice.customer, attrs.customer, 'should return customer')
  t.same(invoice.billingAddress, attrs.billingAddress, 'should return billingAddress')
  t.same(invoice.shippingAddress, attrs.shippingAddress, 'should return shippingAddress')
  t.same(invoice.items, attrs.items, 'should return items')
  t.equal(invoice.total, attrs.total, 'should return total')
  t.equal(invoice.status, attrs.status, 'should return status')  
  t.hasProp(invoice, 'createdAt', 'should return createdAt')
  t.hasProp(invoice, 'updatedAt', 'should return updatedAt')
  
  await Invoice.deleteOne({ _id: invoice._id })
  await Customer.deleteOne({ _id: customer._id })

  attemptDatabaseDisconnection(false)
  t.end()
})