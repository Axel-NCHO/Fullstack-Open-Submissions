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

const updateById = async (id, data) => {
    return await Person.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query'})
}

const deleteById = async (id) => {
    await Person.findByIdAndDelete(id)
}

export default {
    createNewPerson,
    getAllPeople,
    findById,
    updateById,
    deleteById
}