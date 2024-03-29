import { IAddress } from './IAddress'

export interface IInvoice {
  id: string
  reference: string
  customerId: string
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items: IInvoiceItem[]
  total: number
  discount?: number
  currency: string
  transactionId?: string
  status: IInvoiceStatus
  createdAt: Date
  updatedAt?: Date
}

export interface IInvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  discountPrice?: number
  total: number
}

export enum IInvoiceStatus {
  draft,
  issued,
  paid,
  cancelled
}
