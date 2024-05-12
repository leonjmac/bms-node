import express, { Request, Response } from 'express'

import { gateway } from '../../helpers/BTGatewayClient'
import { BTValidationError } from '../../classes/BTValidationError'
import { BadRequestError } from '../../classes/BadRequestError'

const router = express.Router()

interface ClientTokenOptions {
  customerId?: string
  merchantAccountId?: string
}

const generateClientToken = async (options: ClientTokenOptions) => {
  try {
    const result = await gateway.clientToken.generate({
      customerId: options.customerId,
      merchantAccountId: options.merchantAccountId
    })
    if (result.success && result.clientToken) return { token: result.clientToken }
    throw new BTValidationError(result.errors.deepErrors())
  } catch (err) {
    if (err instanceof BTValidationError) throw err
    throw new BadRequestError('Failed to generate client token.')
  }
}

const attemptGenerateClientToken = async (req: Request, res: Response) => {
  try {
    const token = await generateClientToken({
      customerId: req.body.customerId,
      merchantAccountId: req.body.merchantAccountId
    })
    res.status(201).send(token)
  } catch (err) {
    throw err
  }
}

router.post('/generate-client-token', attemptGenerateClientToken)

export { router as BraintreeAuthorizationController, generateClientToken }