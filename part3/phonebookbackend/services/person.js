import Person from "../models/person.js";

/**
 * Get all the people from db
 * @returns {Array} Array of people
 */
async function getAllPeople() {
    return Person.find({});
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Create a new person entry
 * @param {Object} root0 new person object
 * @param {string} root0.name name
 * @param {string} root0.number number
 */
async function createNewPerson({ name, number }) {
    const person = new Person({
        name,
        number
    });

    await person.save();
}

/**
 * Find a person by their id
 * @param {string} id id
 * @returns {Object|null} person
 */
async function findById(id) {
    return Person.findById(id);
}

/**
 * Update a person's info by their id
 * @param {string} id id
 * @param {string} data person object
 * @returns {Object} updated person
 */
async function updateById(id, data) {
    return Person.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: "query" });
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Delete a person by their id
 * @param {string} id id
 */
async function deleteById(id) {
    await Person.findByIdAndDelete(id);
}

export default {
    createNewPerson,
    getAllPeople,
    findById,
    updateById,
    deleteById
};
