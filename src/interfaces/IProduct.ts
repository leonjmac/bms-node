import { Document } from 'mongoose'
import ISOCurrencyCode from './ISOCurrencyCode'

export interface IProductAttrs {
  name: string
  description: string
  category: IProductCategory
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

export enum IProductCategory {
  audio,
  crypto,
  game,
  gambling,
  video
}

export interface IProduct extends IProductAttrs, Document {
  id: string
  createdAt: Date
  updatedAt?: Date
}
