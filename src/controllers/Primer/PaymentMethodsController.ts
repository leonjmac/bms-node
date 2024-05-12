import express, { Request, Response } from 'express'
import { executeRequest } from '../../helpers/PrimerAPIClient'

const router = express.Router()

const savePaymentMethod = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payment-instruments/${req.params.id}/vault`, 
      ...req.body
    })
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const fetchPaymentMethods = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'GET', 
      url: `/payment-instruments?customer_id=${req.params.id}`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'DELETE', 
      url: `/payment-instruments/${req.params.id}`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const setDefaultPaymentMethod = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payment-instruments/${req.params.id}/default`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

router.post('/:id/vault', savePaymentMethod)
router.get('/:id', fetchPaymentMethods)
router.delete('/:id', deletePaymentMethod)
router.post('/:id/default', setDefaultPaymentMethod)

export { router as PaymentMethodsController }