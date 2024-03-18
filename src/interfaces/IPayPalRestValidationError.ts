export interface IPayPalRestValidationError {
  code: number
  name: string
  debugId: string
  message: string
  details?: any[]
  links?: any[]
}