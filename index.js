const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

var morgan = require('morgan')
morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});
app.use(morgan(':method :url :response-time :response-body'))

// let persons = [
//     { 
//       id: 1,
//       name: "Arto Hellas", 
//       number: "040-123456"
//     },
//     { 
//       id: 2,
//       name: "Ada Lovelace", 
//       number: "39-44-5323523"
//     },
//     { 
//       id: 3,
//       name: "Dan Abramov", 
//       number: "12-43-234345"
//     },
//     { 
//       id: 4,
//       name: "Mary Poppendieck", 
//       number: "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><br />
                   <p>${new Date()}</p>`)
})

// const generateId = () => {
//     const id = Math.floor(Math.random() * 10000);
//     return id
// }
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }

    const name = request.body.name
    const person = new Person({
      name: name,
      phone: phone
    })

    //const personExists = persons.find(person => person.name === name)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    

    // if (personExists === undefined) {
    //   person.save().then(savedPerson => {
    //     response.json(savedPerson)
    //   })
    // } else {
    //     return response.status(400).json({
    //         error: 'name must be unique' 
    //     })
    // }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080
app.listen(PORT)
console.log(`Server running on port ${PORT}`)