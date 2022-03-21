const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 5,
      required: true
    },
    phone: {
      type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: function(v) {
          return /(\d{2}|\d{3})-\d+/.test(v)
        }, 
        message: 'The number you entered should be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers'}
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)