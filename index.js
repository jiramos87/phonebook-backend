const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

var morgan = require('morgan')
morgan.token('response-body', (req, res) => {return JSON.stringify(req.body)});
app.use(morgan(':method :url :response-time :response-body'))

let m = 0;
m = m + 1;

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><br />
                   <p>${new Date()}</p>`)
})

const generateId = () => {
    const id = Math.floor(Math.random() * 10000);
    return id
}
  
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
    const personExists = persons.find(person => person.name === name)
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date()
        
    }

    if (personExists === undefined) {
      persons = persons.concat(person)
      response.json(person)
      
    } else {
        return response.status(400).json({
            error: 'name must be unique' 
        })
    }
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})