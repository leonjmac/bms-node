import express, { Request, Response } from 'express'
import { executeRequest as paypalRest } from '../../helpers/PPRestAPIClient'
import { IPayPalRestOptions, IPayPalRestOptionsData } from '../../interfaces/IPayPalRestOptions'

const app = express.Router()

const configurePayPalOrderRequest = (data: IPayPalRestOptionsData) => {
  const payload = data.order || data.invoice
  return {
    intent: data.intent || 'CAPTURE',
    purchase_units: [
      {
        reference_id: payload!.reference,
        amount: {
          currency_code: payload?.items?.at(0)?.currencyCode || 'GBP',
          value: `${payload!.total}`
        },
        items: payload?.items && payload!.items.map(item => {
          return {
            name: item.description,
            quantity: item.quantity,
            sku: item.sku,
            unit_amount: {
              currency_code: item.currencyCode,
              value: `${item.totalPrice}`
            }
          }
        })
      }
    ]    
  }
}

/* c8 ignore next 13 */
const performRequest = async (options: IPayPalRestOptions) => {
  try {
    const response = await paypalRest(
      options.method,
      options.path,
      options.data.order || options.data.invoice ? configurePayPalOrderRequest(options.data) : options.data,
      options.idempotent
    )
    return response
  } catch (err) {
    throw err
  }
}

/* c8 ignore next 14*/
const attemptExecuteRequest = async (req: Request, res: Response) => {
  try {
    const response = await performRequest({
      method: req.body.method,
      path: req.body.path,
      data: req.body.data,
      idempotent: req.body.idempotent
    })
    res.status(response.statusCode).send(response.response)
  } catch (err) {
    throw err
  }
}

app.use('/', attemptExecuteRequest)

export { 
  app as PPRestAPIController, 
  performRequest as performRestRequest,
  configurePayPalOrderRequest as __configurePayPalOrderRequest
}