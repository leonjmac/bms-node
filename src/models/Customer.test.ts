import Customer from './Customer'
import { ICustomerAttrs, ICustomerReferenceType } from '../interfaces/ICustomer'

import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('Customer', async (t) => {
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

  const attrs = {
    references: [{
      type: ICustomerReferenceType.braintree,
      reference: 'test-reference-braintree'
    },{
      type: ICustomerReferenceType.primer,
      reference: 'test-reference-primer'
    }],
    forename: 'test-customer-forename',
    surname: 'test-customer-surname',
    email: 'test-customer-email',
    dateOfBirth: new Date(),
    billingAddress: [address],
    shippingAddress: [address]
  } as ICustomerAttrs

  const customer = await Customer.build(attrs).save()

  t.ok(customer, 'should return customer')
  t.same(customer.references, attrs.references, 'should return references')
  t.equal(customer.forename, attrs.forename, 'should return forename')
  t.equal(customer.surname, attrs.surname, 'should return surname')
  t.equal(customer.email, attrs.email, 'should return email')
  t.same(customer.billingAddress, attrs.billingAddress, 'should return billingAddress')
  
  t.hasProp(customer, 'dateOfBirth', 'should return dateOfBirth')
  t.hasProp(customer, 'createdAt', 'should return createdAt')
  t.hasProp(customer, 'updatedAt', 'should return updatedAt')
  
  await Customer.deleteOne({ _id: customer._id })

  attemptDatabaseDisconnection(false)
  t.end()
})