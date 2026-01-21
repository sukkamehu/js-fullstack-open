require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})