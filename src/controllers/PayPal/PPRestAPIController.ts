import express, { Request, Response } from 'express'
import { executeRequest as paypalRest } from '../../helpers/PPRestAPIClient'
import { IPayPalRestOptions } from '../../interfaces/IPayPalRestOptions'

const app = express.Router()

const performRequest = async (options: IPayPalRestOptions) => {
  try {
    const response = await paypalRest(
      options.method,
      options.path,
      options.data,
      options.idempotent
    )
    return response
  } catch (err) {
    throw err
  }
}

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
}