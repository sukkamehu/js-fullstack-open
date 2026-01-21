const mongoose = require('mongoose')
const env = require('dotenv')
const MONGODB_URI = require('../utils/config').MONGODB_URI
env.config()


// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url = MONGODB_URI;

mongoose.set('strictQuery',false)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Contacts', noteSchema)

module.exports = Note