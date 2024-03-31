import { Document } from 'mongoose'
import { IAddress } from './IAddress'
import { ICustomer } from './ICustomer'
import { ILineItem } from './ILineItem'
import { ITransaction } from './ITransaction'

export interface IInvoiceAttrs {
  reference: string
  customer: ICustomer
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items: IInvoiceItem[]
  total: number
  transaction?: ITransaction
  status: IInvoiceStatus
}

export interface IInvoice extends IInvoiceAttrs, Document {
  id: string
  createdAt: Date
  updatedAt?: Date
}

export interface IInvoiceItem extends ILineItem {}

export enum IInvoiceStatus {
  draft,
  issued,
  paid,
  cancelled
}
