import Order from './Order'
import Customer from './Customer'
import { IOrderAttrs, IOrderStatus } from '../interfaces/IOrder'

import ISOCurrencyCode from '../interfaces/ISOCurrencyCode'
import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('Order', async (t) => {
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
    status: IOrderStatus.created
  } as IOrderAttrs

  const order = await Order.build(attrs).save()

  t.ok(order, 'should return invoice')
  t.equal(order.reference, attrs.reference, 'should return reference')
  t.equal(order.customer, attrs.customer, 'should return customer')
  t.same(order.billingAddress, attrs.billingAddress, 'should return billingAddress')
  t.same(order.shippingAddress, attrs.shippingAddress, 'should return shippingAddress')
  t.same(order.items, attrs.items, 'should return items')
  t.equal(order.total, attrs.total, 'should return total')
  t.equal(order.status, attrs.status, 'should return status')  
  t.hasProp(order, 'createdAt', 'should return createdAt')
  t.hasProp(order, 'updatedAt', 'should return updatedAt')
  
  await Order.deleteOne({ _id: order._id })
  await Customer.deleteOne({ _id: customer._id })

  attemptDatabaseDisconnection(false)
  t.end()
})