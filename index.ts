import './env'
import app from './src/App'
import { CustomError } from './src/classes/CustomError'
import { AppLogger, AppLoggerLevel } from './src/middlewares/app-logger'
import { attemptDatabaseConnection } from './src/middlewares/db-connector'

const start = async () => {
  try {
    await attemptDatabaseConnection()
    app.listen(process.env.PORT, () => {
      AppLogger(AppLoggerLevel.INFO, `Success! The "bms-server" on NodeJS is running on port ${process.env.PORT}.`)
    })
  } catch (err) {
    if(err instanceof CustomError) {
      AppLogger(AppLoggerLevel.ERROR, err.message)
    }
    process.exit(1)
  }
}

start()