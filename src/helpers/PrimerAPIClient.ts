import axios, { Method } from 'axios'

import { v4 as uuid } from 'uuid'

const client = axios.create({
  baseURL: ' https://api.sandbox.primer.io',
  headers: {
    'X-Api-Key': process.env.PRIMER_API_KEY!
  }
})

const executeRequest = async (method: Method, url: string, data?: Object, version?: number, idempotent?: boolean) => {
  try {
    if (version === undefined) version = Number(process.env.PRIMER_API_VERSION!)
    const response = await client.request({
      headers: {
        'X-Api-Version': version,
        'X-Idempotency-Key': idempotent ? uuid() : undefined,
        'legacy-workflows': false
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
