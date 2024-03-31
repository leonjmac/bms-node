import { Document } from 'mongoose'
import { IAddress } from './IAddress'
import { IOrder } from './IOrder'
import { IInvoice } from './IInvoice'

export interface ICustomerAttrs {
  references?: ICustomerReference[]
  forename: string
  surname: string
  email: string
  dateOfBirth?: Date
  billingAddress?: IAddress[]
  shippingAddress?: IAddress[]  
  orders?: IOrder[]
  invoices?: IInvoice[]
}

export interface ICustomer extends ICustomerAttrs, Document {
  id: string
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
