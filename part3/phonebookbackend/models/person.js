import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

await mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,},
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (value) => /^(\d{2,3})-\d+$/.test(value),
            message: (props) => ` ${props.value}: Wrong number format. Expected at least 8 digits with the first two or three ' +
                'separated from the others by a dash '-'.`,
        },
        required: true,
    },
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