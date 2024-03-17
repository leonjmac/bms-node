import mongoose from 'mongoose'
import { DatabaseConnectionError } from '../classes/DatabaseConnectionError'
import { AppLogger, AppLoggerLevel } from './app-logger'

export const attemptDatabaseConnection = async () => {  
  try {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
    mongoose.set('strictQuery', true)
    const client = await mongoose.connect(uri)
    AppLogger(AppLoggerLevel.INFO, `"${client.connection.db.databaseName}" database connected and running on v"${client.version}.`)
  } catch (err) {
    throw new DatabaseConnectionError()
  }
}
