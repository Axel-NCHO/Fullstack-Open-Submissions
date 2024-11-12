import mongoose from "mongoose";
import util from "./util.js";

if (process.argv.length < 3) {
    // eslint-disable-next-line no-console -- Needed for debugging
    console.log("give password as first argument");
    throw new Error("Database password needed");
}

const password = process.argv[2].replace("@", util.percentEncoding["@"]);

const url =
    `mongodb+srv://axel:${password}@cluster0.fk95j.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

await mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set("toJSON", {
    transform(doc, ret) {
        // eslint-disable-next-line no-underscore-dangle -- _id is default in mongodb
        ret.id = ret._id.toString();
        // eslint-disable-next-line no-underscore-dangle -- _id is default in mongodb
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle -- __v is default in mongodb
        delete ret._v;
    }
});

const Person = mongoose.model("Person", personSchema);

/**
 * Get all people
 * @returns {Array} array of people
 */
async function getAllPeople() {
    const res = await Person.find({});

    await mongoose.connection.close();

    return res;
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Create bew person
 * @param {Object} root0 person
 * @param {string} root0.name name
 * @param {string} root0.number number
 */
async function createNewPerson({ name, number }) {
    const person = new Person({
        name,
        number
    });

    person.save()
        .then(async result => {
            // eslint-disable-next-line no-console -- Needed for debugging
            console.log(`Added "${result.name}" number ${result.number} to phonebook`);
            await mongoose.connection.close();
        })
        // eslint-disable-next-line no-console -- Needed for debugging
        .catch(err => console.log(err));
}

if (process.argv.length === 3) {
    // eslint-disable-next-line no-console -- Needed for debugging
    console.log("Phonebook");
    const res = await getAllPeople();

    res.forEach(person => {
        // eslint-disable-next-line no-console -- Needed for debugging
        console.log(`${person.name} (${person.number})`);
    });
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    await createNewPerson({ name, number });
}
