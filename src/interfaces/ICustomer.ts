import { IAddress } from './IAddress'

export interface ICustomer {
  id: string
  references?: ICustomerReference[]
  forename: string
  surname: string
  email: string
  dateOfBirth?: Date
  billingAddress?: IAddress[]
  shippingAddress?: IAddress[]
  // Array of order IDs
  orders?: string[]
  // Array of invoice IDs
  invoices?: string[]
  createdAt: Date
  updatedAt?: Date
}

export interface ICustomerReference {
  reference: string
  type: ICustomerReferenceType
}

export enum ICustomerReferenceType {
  adyen,
  braintree,
  hyperwallet,
  paypal,
  primer,
  stripe
}