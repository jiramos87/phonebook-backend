const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url =
  `mongodb+srv://jiramos87:${password}@cluster0.lsj1x.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: name,
    phone: phone
  })

if (name == undefined) {
    Contact.find({}).then(result => {
        console.log('phonebook:\n')
        result.forEach(cont => {
            console.log(`${cont.name} ${cont.phone}`) 
            
        })
        mongoose.connection.close()
        
    })
} 
if (name != undefined) {
    contact.save().then(result => {
        console.log(`added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
    })
}



