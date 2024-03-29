import { IAddress } from './IAddress'

export interface IOrder {
  id: string
  reference: string
  customerId?: string
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items?: IOrderItem[]
  total: number
  discount?: number
  currency: string
  status: IOrderStatus
  transactionId?: string
  createdAt: Date
  updatedAt?: Date
}

export interface IOrderItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  discountPrice?: number
  total: number
}

export enum IOrderStatus {
  authorized,
  dispatched,
  cancelled,  
  returned
}