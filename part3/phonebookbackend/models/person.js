import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;

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
        delete ret.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person