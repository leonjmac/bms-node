import { IAddress } from './IAddress'
import { IProduct } from './IProduct'

export interface IOrder {
  id: string
  reference: string
  customerId?: string
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items?: IOrderItem[]
  status: IOrderStatus
  transactionId?: string
  createdAt: Date
  updatedAt?: Date
}

export interface IOrderItem extends IProduct {
  quantity: number
}

export enum IOrderStatus {
  authorized,
  dispatched,
  cancelled,  
  returned
}