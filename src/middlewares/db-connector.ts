import mongoose from 'mongoose'
import '../../env'
import { DatabaseConnectionError } from '../classes/DatabaseConnectionError'
import { AppLogger, AppLoggerLevel } from './app-logger'

export const attemptDatabaseConnection = async (nonTapMode: boolean = true) => {
  try {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`
    mongoose.set('strictQuery', true)
    const client = await mongoose.connect(uri)
    nonTapMode && AppLogger(AppLoggerLevel.INFO, `"${client.connection.db.databaseName}" database connected and running on v"${client.version}.`)
  } catch (err) {
    throw new DatabaseConnectionError()
  }
}

export const attemptDatabaseDisconnection = async (nonTapMode: boolean = true) => {
  try {
    await mongoose.connection.close()
    nonTapMode && AppLogger(AppLoggerLevel.INFO, 'Database connection closed.')
  } catch (err) {
    throw new DatabaseConnectionError()
  }
}