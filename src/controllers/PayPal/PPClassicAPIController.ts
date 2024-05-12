import express, { Request, Response } from 'express'
import { executeRequest, configureParams } from '../../helpers/PPClassicAPIClient'

const app = express.Router()

const attemptExecuteRequest = async (req: Request, res: Response) => {
  try {
    const params = configureParams({ ...req.body })
    const response = await executeRequest(params)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

const setExpressCheckout = async (req: Request, res: Response) => {
  try {
    const params = configureParams({ 
      method: 'SetExpressCheckout',
      ...req.body
     })
    const response = await executeRequest(params)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

const getExpressCheckoutDetails = async (req: Request, res: Response) => {
  try {
    const params = configureParams({ 
      method: 'GetExpressCheckoutDetails',
      ...req.body
     })
    const response = await executeRequest(params)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

const doExpressCheckoutPayment = async (req: Request, res: Response) => {
  try {
    const params = configureParams({ 
      method: 'DoExpressCheckoutPayment',
      ...req.body
     })
    const response = await executeRequest(params)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

// Generic route for executing PayPal Classic API requests
app.post('/', attemptExecuteRequest)

// Specific routes for PayPal Classic API methods
app.post('/setExpressCheckout', setExpressCheckout)
app.get('/getExpressCheckoutDetails', getExpressCheckoutDetails)
app.post('/doExpressCheckoutPayment', doExpressCheckoutPayment)

export { app as PPClassicAPIController }