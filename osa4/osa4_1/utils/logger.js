const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
  morganMiddleware
}
