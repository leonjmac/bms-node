import express, { Request, Response } from 'express'
import { executeRequest } from '../../helpers/PrimerAPIClient'

const router = express.Router()

const createSession = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest('POST', '/client-session', req.body)
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const fetchSession = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest('GET', `/client-session`)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

const updateSession = async (req: Request, res: Response) => {
  try {
    const response = await executeRequest('PATCH', `/client-session`, req.body)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({error})
  }
}

router.post('/', createSession)
router.get('/', fetchSession)
router.patch('/', updateSession)

export { router as ClientSessionController }