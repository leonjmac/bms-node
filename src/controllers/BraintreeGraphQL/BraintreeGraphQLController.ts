import express, { Request, Response } from 'express'
import { performChainedRequest, performRequest } from '../../helpers/BTGraphQLClient'

const router = express.Router()

const executeRequest = async (req: Request, res: Response) => {
  const { query, variables } = req.body
  try {
    const response = await performRequest(query, variables)
    res.status(200).send({
      data: response.data,
      extensions: response.extensions
    })
  } catch (error) {
    res.status(400).send({error})
  }
}

const executeChainedRequest = async (req: Request, res: Response) => {
  const requests: any[] = req.body.json
  try {
    const response = await performChainedRequest(requests)
    res.status(200).send({
      data: response,
      extensions: response.extensions
    })
  } catch (error) {
    res.status(400).send({error})
  }
}

router.post('/standard', executeRequest)
router.post('/chained', executeChainedRequest)

export { router as BraintreeGraphQLController }