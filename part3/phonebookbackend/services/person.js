import Person from '../models/person.js'

const getAllPeople = async () => {
    return await Person.find({})
}

const createNewPerson = async ({ name, number }) => {
    const person = new Person({
        name: name,
        number: number,
    })
    await person.save()
}

const findById = async (id) => {
    return await Person.findById(id)
}

export default {
    createNewPerson,
    getAllPeople,
    findById,
}