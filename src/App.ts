import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import { InvalidRouteError } from './classes/InvalidRouteError'

import { errorHandler } from './middlewares/error-handler'

const app = express()
app.use(cors())
app.use(express.json())

// GENERIC ERROR HANDLER FOR UNMATCHED ROUTES
app.use('*', () => {
  throw new InvalidRouteError()
})

app.use(errorHandler)

export default app