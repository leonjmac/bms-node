import { Hyperwallet } from 'hyperwallet-sdk';

const client = new Hyperwallet({
  username: process.env.HYPERWALLET_API_USERNAME!,
  password: process.env.HYPERWALLET_API_PASSWORD!,
  programToken: process.env.HYPERWALLET_PROGRAM_TOKEN!
})

export { client as Hyperwallet }