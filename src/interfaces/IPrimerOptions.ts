import { Method } from 'axios'

export interface IPrimerOptions { 
  method: Method, 
  url: string, 
  data?: Object, 
  version?: number, 
  idempotent?: boolean 
}