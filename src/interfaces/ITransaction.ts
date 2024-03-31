import { Document } from 'mongoose'
import ISOCurrencyCode from './ISOCurrencyCode'

export interface ITransactionAttrs {
  amount: number
  currency: ISOCurrencyCode
  platform: ITransactionPlatform
  paymentMethod: string
  paymentMethodDetails: string
  status: ITransactionStatus
}

export interface ITransaction extends ITransactionAttrs, Document {
  id: string
  createdAt: Date
  updatedAt?: Date
}

export enum ITransactionPlatform {
  adyen,
  braintree,
  paypal,
  primer,
  stripe
}

export enum ITransactionStatus {
  authorized,
  captured,
  refunded,
  disputed,
  cancelled
}