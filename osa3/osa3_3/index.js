const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.json())

const BASE_PATH = '/fullstackopen/puhelinluettelo'

app.get(`${BASE_PATH}/api/notes/:id`, (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get(`${BASE_PATH}/api/notes`, (request, response, next) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
    .catch(error => next(error))
})

app.patch(`${BASE_PATH}/api/notes/:id`, (request, response, next) => {
  const { name, number, important } = request.body

  Note.findByIdAndUpdate(request.params.id, { name, number, important }, { new: true, runValidators: true })
    .then(updatedNote => {
      if (updatedNote) {
        response.json(updatedNote)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


// Serve static files at the base path
app.use(BASE_PATH, express.static('dist'))
app.use("/", express.static('dist'))

app.delete(`${BASE_PATH}/api/notes/:id`, (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post(`${BASE_PATH}/api/notes`, morgan(':method :url :status :res[content-length] - :response-time ms :body'), (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    name: body.name,
    number: body.number
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 8888
app.listen(PORT)
console.log(`Server running on port ${PORT}`)