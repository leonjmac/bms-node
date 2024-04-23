import axios from 'axios'
import qs from 'qs'
import { URLSearchParams } from 'url'
import { BadRequestError } from '../classes/BadRequestError'

const client = axios.create({
  baseURL: 'https://api-3t.sandbox.paypal.com/nvp',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const URL_PARAMS = new URLSearchParams({
  USER: process.env.PAYPAL_NVP_USERNAME!,
  PWD: process.env.PAYPAL_NVP_PASSWORD!,
  SIGNATURE: process.env.PAYPAL_NVP_SIGNATURE!,
  VERSION: process.env.PAYPAL_NVP_VERSION!
})

const configureParams = (payload: Object) => {
  const params = URL_PARAMS
  Object.keys(payload).forEach(key => {
    // @ts-ignore
    const value = payload[key]
    if(typeof value === 'object') {
      value.map((item: Array<string> | Object, idx: number) => {
        Object.keys(item).forEach((k: string) => {
          // @ts-ignore
          params.append(`L_${key}_${k.toUpperCase()}_${idx}`, item[k])          
        })
      })
    } else {
      if(value) params.append(key, value)
    }
  })
  return params.toString()
}

const executeRequest = async (params: Object) => {
  try {
    const response = await client.post('', params)
    return qs.parse(response.data)
  } catch (error) {
    // @ts-ignore
    throw new BadRequestError(error.message)
  }
}

export { executeRequest, configureParams }