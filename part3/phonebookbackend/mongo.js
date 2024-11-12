import mongoose from 'mongoose';
import util from './util.js';

if (process.argv.length<3) {
    console.log('give password as first argument')
    process.exit(1)
}

const password = process.argv[2].replace('@', util.percentEncoding['@'])

const url =
    `mongodb+srv://axel:${password}@cluster0.fk95j.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

await mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret._v
    }
})

const Person = mongoose.model('Person', personSchema)

const getAllPeople = async () => {
    const res = await Person.find({})
    await mongoose.connection.close()
    return res
}

const createNewPerson = ({ name, number }) => {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save()
        .then(async result => {
            console.log(`Added "${result.name}" number ${result.number} to phonebook`)
            await mongoose.connection.close()
        })
        .catch(err => console.log(err))
}

if (process.argv.length === 3) {
    console.log("Phonebook")
    const res = await getAllPeople()
    res.forEach(person => { console.log(`${person.name} (${person.number})`) })
}
else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    createNewPerson({name, number})
}