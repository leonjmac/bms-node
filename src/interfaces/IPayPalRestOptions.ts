import { Method } from 'axios'
import { IOrderAttrs } from './IOrder'
import { IInvoiceAttrs } from './IInvoice'

interface IPayPalRestOptions {
  method: Method
  path: string
  data?: IPayPalRestOptionsData | any
  idempotent?: boolean
}

interface IPayPalRestOptionsData {
  intent?: string
  order?: IOrderAttrs
  invoice?: IInvoiceAttrs
}

export { IPayPalRestOptions, IPayPalRestOptionsData }