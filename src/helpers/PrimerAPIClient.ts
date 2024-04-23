import axios from 'axios'

import { v4 as uuid } from 'uuid'
import { IPrimerOptions } from '../interfaces/IPrimerOptions'

const client = axios.create({
  baseURL: ' https://api.sandbox.primer.io',
  headers: {
    'X-Api-Key': process.env.PRIMER_API_KEY!
  }
})

const executeRequest = async (options: IPrimerOptions) => {
  try {
    if (options.version === undefined) options.version = Number(process.env.PRIMER_API_VERSION!)
    const response = await client.request({
      headers: {
        'X-Api-Version': options.version,
        'X-Idempotency-Key': options.idempotent ? uuid() : undefined,
        'legacy-workflows': false
      },
      ...options
    })
    return response.data

  } catch (error) {
    // @ts-ignore
    throw new Error(error.message)
  }
}

export { executeRequest }
