const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.json())

const BASE_PATH = '/fullstackopen/puhelinluettelo'

let persons = [
    {
        "name": "Dan Abramov",
        "number": "4432342",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "id": 4100,
        "name": "Kalle Ihminen",
        "number": "3234"
    },
    {
        "id": 16814,
        "name": "Matti Meikäläinen",
        "number": "342343"
    },
    {
        "id": 6370,
        "name": "Artsi Hellas",
        "number": "31123"
    },
    {
        "id": 20002,
        "name": "Pasi Luukkonen",
        "number": "22"
    },
    {
        "id": 30268,
        "name": "Mikko Mallikas",
        "number": "32432"
    },
    {
        "id": 35234,
        "name": "Kari Virtanen",
        "number": "453453"
    },
    {
        "id": 43654,
        "name": "Peppi Pitkätossu",
        "number": "342234234"
    },
    {
        "id": 10228,
        "name": "Iina Isotissinen",
        "number": "235235"
    }
]

app.get(`${BASE_PATH}/api/persons`, (req, res) => res.json(persons));
app.get(`${BASE_PATH}/info`, (req, res) => res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`));
app.get(`${BASE_PATH}/api/persons`, (req, res) => res.json(persons));
app.get(`${BASE_PATH}/api/persons/:id`, (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// Serve static files at the base path
app.use(BASE_PATH, express.static('dist'))
app.use("/", express.static('dist'))

app.delete(`${BASE_PATH}/api/persons/:id`, (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
});


app.post(`${BASE_PATH}/api/persons`, morgan(':method :url :status :res[content-length] - :response-time ms :body'), (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000).toString()
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 8888
app.listen(PORT)
console.log(`Server running on port ${PORT}`)