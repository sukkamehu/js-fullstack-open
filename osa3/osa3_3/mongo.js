const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const contactPerson = process.argv[3]
const contactNumber = process.argv[4]

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb+srv://fullstack:${password}@cluster0.pnpajhn.mongodb.net/?appName=Cluster0`;
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})

const Contact = mongoose.model('Contacts', noteSchema)

if(!contactPerson || !contactNumber) {
    console.log('Phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
    return
}

const contact = new Contact({
    name: contactPerson,
    number: contactNumber,
})

contact.save().then(result => {
    console.log(`added ${contactPerson} number ${contactNumber} to phonebook`)
    mongoose.connection.close()
})