import { IAddress } from './IAddress'
import { IProduct } from './IProduct'

export interface IInvoice {
  id: string
  reference: string
  customerId: string
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items: IInvoiceItem[]
  transactionId?: string
  status: IInvoiceStatus
  createdAt: Date
  updatedAt?: Date
}

export interface IInvoiceItem extends IProduct {
  quantity: number
}

export enum IInvoiceStatus {
  draft,
  issued,
  paid,
  cancelled
}
