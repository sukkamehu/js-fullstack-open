const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(logger.morganMiddleware)
app.use(cors())
app.use(express.json())

// Serve static files at the base path
app.use(require('./utils/config').BASE_PATH, express.static('dist'))

app.use(require('./utils/config').BASE_PATH + '/api/notes', notesRouter)
app.use(require('./utils/config').BASE_PATH + '/api/blogs', require('./controllers/blogs'))
app.use(require('./utils/config').BASE_PATH + '/api/users', usersRouter)
app.use(require('./utils/config').BASE_PATH + '/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app