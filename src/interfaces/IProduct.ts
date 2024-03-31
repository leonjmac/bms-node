import { Document } from 'mongoose'
import ISOCurrencyCode from './ISOCurrencyCode'

export interface IProductAttrs {
  description: string
  category: number
  promote?: boolean
  sku: string
  baseUnitPrice: number
  currencyCode: ISOCurrencyCode
  discountUnitPrice?: number
  images?: string[]
  url?: string
  isCollectable?: boolean
  isDeliverable?: boolean
}

export interface IProduct extends IProductAttrs, Document {
  id: string
  createdAt: Date
  updatedAt?: Date
}
