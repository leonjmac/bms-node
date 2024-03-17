import './env'
import app from './src/App'

const start = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Success - node-ts is running on port ${process.env.PORT}!`)
  })
}

start()