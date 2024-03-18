import express, { Request, Response } from 'express'
import { gateway } from '../../helpers/BTGatewayClient'
import braintree from 'braintree'

import { BTResponseError } from '../../classes/BTResponseError'
import { BTValidationError } from '../../classes/BTValidationError'

const router = express.Router()

const createTransaction = async (req: Request, res: Response) => {
  try {
    const response = await gateway.transaction.sale({ ...req.body as braintree.TransactionRequest })
    if(response.success) {
      res.status(201).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

const voidTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const response = await gateway.transaction.void(id)
    if(response.success) {
      res.status(200).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

const adjustAuthorization = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const amount = req.body.amount
    const response = await gateway.transaction.adjustAuthorization(id, amount)
    if(response.success) {
      res.status(200).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

// Covers both full and partial settlement
const captureTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const amount = req.body.amount
    const response = req.query.mode === 'partial' ? await gateway.transaction.submitForPartialSettlement(id, amount) : await gateway.transaction.submitForSettlement(id, amount)
    if(response.success) {
      res.status(200).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

const settleTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const response = await gateway.testing.settle(id)
    if(response.success) {
      res.status(200).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

const refundTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const amount = req.body.amount
    const response = await gateway.transaction.refund(id, amount)
    if(response.success) {
      res.status(200).json(response.transaction)
    }
    if(response.errors.deepErrors().length > 0) {
      throw new BTValidationError(response.errors.deepErrors())
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

const findTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const response = await gateway.transaction.find(id)
    if(response) {
      res.status(200).json(response)
    } else {
      throw new BTResponseError(response)
    }
  } catch (error) {
    throw error
  }
}

router.post('/sale', createTransaction)
router.post('/void/:id', voidTransaction)
router.post('/capture/:id', captureTransaction)
router.post('/settle/:id', settleTransaction)
router.post('/refund/:id', refundTransaction)
router.post('/adjust/:id', adjustAuthorization)
router.get('/:id', findTransaction)

export { router as BraintreeTransactionController }