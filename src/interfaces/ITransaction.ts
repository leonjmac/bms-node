export interface ITransaction {
  id: string
  amount: number
  currency: string
  platform: ITransactionPlatform
  paymentMethod: string
  paymentMethodDetail: string
  status: ITransactionStatus
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