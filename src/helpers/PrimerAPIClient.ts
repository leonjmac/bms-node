import axios, { Method } from 'axios'

import { v4 as uuid } from 'uuid'

const client = axios.create({
  baseURL: ' https://api.sandbox.primer.io',
  headers: {
    'X-Api-Key': process.env.PRIMER_API_KEY!
  }
})

const executeRequest = async (method: Method, url: string, data?: Object, version: number = 2.2, idempotent?: boolean) => {
  try {
    const response = await client.request({
      headers: {
        'X-Api-Version': version,
        'X-Idempotency-Key': idempotent ? uuid() : undefined
      },
      method,
      url,
      data
    })
    return response.data

  } catch (error) {
    // @ts-ignore
    throw new Error(error.message)
  }
}

export { executeRequest }

