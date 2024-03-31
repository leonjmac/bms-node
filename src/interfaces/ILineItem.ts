import ISOCurrencyCode from './ISOCurrencyCode'

export interface ILineItem {
  id: string
  description: string
  sku?: string
  quantity: number
  baseUnitPrice: number
  discountUnitPrice?: number
  totalPrice: number
  currencyCode: ISOCurrencyCode
}