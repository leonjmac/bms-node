import { Document } from 'mongoose'
import { IAddress } from './IAddress'
import { ICustomer } from './ICustomer'
import { ILineItem } from './ILineItem'
import { ITransaction } from './ITransaction'

export interface IOrderAttrs {
  reference: string
  customer?: ICustomer
  billingAddress?: IAddress
  shippingAddress?: IAddress
  items?: IOrderItem[]
  status: IOrderStatus
  transaction?: ITransaction
  total: number
}

export interface IOrder extends IOrderAttrs, Document {
  id: string  
  createdAt: Date
  updatedAt?: Date
}

export interface IOrderItem extends ILineItem {}

export enum IOrderStatus {
  created,
  authorized,
  dispatched,
  cancelled,  
  returned
}