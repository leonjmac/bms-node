import { Method } from 'axios'

interface IPayPalRestOptions {
  method: Method
  path: string
  data?: any
  idempotent?: boolean
}

export { IPayPalRestOptions }