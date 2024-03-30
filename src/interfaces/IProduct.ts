import ISOCurrencyCode from './ISOCurrencyCode'

export interface IProduct {
  id: string
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
  createdAt: Date
  updatedAt?: Date
}
