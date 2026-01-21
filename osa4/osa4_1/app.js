const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

app.use(logger.morganMiddleware)
app.use(cors())
app.use(express.json())

// Serve static files at the base path
app.use(require('./utils/config').BASE_PATH, express.static('dist'))

app.use(require('./utils/config').BASE_PATH + '/api/blogs', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app