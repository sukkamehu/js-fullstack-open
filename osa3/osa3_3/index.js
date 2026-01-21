const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const { BASE_PATH, PORT } = require('./utils/config')

app.use(logger)
app.use(cors())
app.use(express.json())

// Serve static files at the base path
app.use(BASE_PATH, express.static('dist'))
app.use("/", express.static('dist'))

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


app.delete(`${BASE_PATH}/api/notes/:id`, (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post(`${BASE_PATH}/api/notes`, logger, (request, response, next) => {
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

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT)
console.log(`Server running on port ${PORT}`)