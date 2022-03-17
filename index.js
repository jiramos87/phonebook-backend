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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><br />
                   <p>${new Date()}</p>`)
})
  
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
    const phone = request.body.number
    const person = new Person({
      name: name,
      phone: phone
    })

    // if(Person.find({ name: person.name }) != undefined) {
    //   Person.findOneAndUpdate({ name: person.name }, person, { new: true })
    //   .then(updatedPerson => {
    //     response.json(updatedPerson)
    //   })
    //   .catch(error => next(error))
    // } else {
    //   person.save().then(savedPerson => {
    //     response.json(savedPerson)
    //   })
    // }
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    phone: body.number
  }

  Person.findOneAndUpdate({name: person.name}, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT)
console.log(`Server running on port ${PORT}`)