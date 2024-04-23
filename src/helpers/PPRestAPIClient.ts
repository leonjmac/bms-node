import axios, { Method } from 'axios'
import { BadRequestError } from '../classes/BadRequestError'
import { PayPalRestValidationError } from '../classes/PayPalRestValidationError'
import type { IPayPalAccessToken } from '../interfaces/IPayPalRestAccessToken'

import { v4 as uuid } from 'uuid'

let token: IPayPalAccessToken

const authorization = {
  auth: {
    username: process.env.PAYPAL_CLIENT_ID!,
    password: process.env.PAYPAL_CLIENT_SECRET!
  }
}

const client = axios.create({
  baseURL: 'https://api-m.sandbox.paypal.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const tokenRefreshRequired = () => {
  return (token === undefined || token.expires_in < Date.now())
}

const generateAccessToken = async () => {
  if (!tokenRefreshRequired()) { return token }
  try {
    const response = await client.post<IPayPalAccessToken>('v1/oauth2/token', 'grant_type=client_credentials', authorization)
    token = {
      access_token: response.data.access_token,
      expires_in: Date.now() + (response.data.expires_in * 1000)
    }
    return token
  } catch (error) {
    // @ts-ignore
    throw new BadRequestError(error.message)
  }
}

const executeRequest = async (method: Method, url: string, data?: Object, idempotent?: boolean) => {
  try {
    const accessToken = await generateAccessToken()
    const response = await client.request({
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'PayPal-Request-Id': idempotent ? uuid() : undefined
      },
      method,
      url,
      data
    })
    return { response: response.data, statusCode: response.status }

  } catch (error) {
    // @ts-ignore
    throw new PayPalRestValidationError(error.response.status, error.response.data)
  }
}

export { generateAccessToken, executeRequest }