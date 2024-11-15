import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export default {
    env: {
        MONGODB_URI,
        PORT,
        JWT_SECRET
    }
};
