import express, { Request, Response } from 'express'
import { executeRequest } from '../../helpers/PrimerAPIClient'

const router = express.Router()

const createPayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: '/payments', 
      ...req.body
    })
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const authorizePayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/authorize`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const capturePayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/capture`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const cancelPayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/cancel`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const refundPayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/refund`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const resumePayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/resume`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const adjustAuthorization = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'POST', 
      url: `/payments/${req.params.id}/adjust-authorization`,
      ...req.body
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const fetchPayment = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest({
      method: 'GET', 
      url: `/payments/${req.params.id}`
    })
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

router.post('/', createPayment)
router.post('/:id/authorize', authorizePayment)
router.post('/:id/capture', capturePayment)
router.post('/:id/cancel', cancelPayment)
router.post('/:id/refund', refundPayment)
router.post('/:id/resume', resumePayment)
router.post('/:id/adjust-authorization', adjustAuthorization)
router.get('/:id', fetchPayment)

export { router as PaymentsController }