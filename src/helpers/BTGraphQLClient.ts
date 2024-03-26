import axios from 'axios'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'

const authorization = Buffer.from(
  `${process.env.BRAINTREE_PUBLIC_KEY}:${process.env.BRAINTREE_PRIVATE_KEY}`,
  'utf-8'
).toString('base64')

const client = axios.create({
  baseURL: process.env.BRAINTREE_GRAPHQL_ENDPOINT!,
  headers: {
    Authorization: `Basic ${authorization}`,
    'Braintree-Version': `${process.env.BRAINTREE_GRAPHQL_VERSION!}`
  }
})

const performRequest = async (query: any, variables: any) => {
  try {
    const response = await client.post('', {
      query,
      variables
    }, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (response.data.errors) throw response.data.errors
    return response.data
  } catch (err) {
    // @ts-ignore
    AppLogger(AppLoggerLevel.ERROR, err.message)
    throw err
  }
}

const performChainedRequest = async (json: any[]) => {
  try {
    const response = await client.post('', json, {
      headers: {
        accept: 'application/vnd+braintree.graphql.batch.v0+json',
        'Content-Type': 'application/vnd+braintree.graphql.batch.v0+json'
      }
    })
    if (response.data.errors) throw response.data.errors
    return response.data
  } catch (err) {
    // @ts-ignore
    AppLogger(AppLoggerLevel.ERROR, err.message)
    throw err
  }
}

export { performRequest, performChainedRequest }