import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set("toJSON", {
    transform(doc, ret) {
        // eslint-disable-next-line no-underscore-dangle -- _id is the default in mongodb
        ret.id = ret._id.toString();
        // eslint-disable-next-line no-underscore-dangle -- _id is the default in mongodb
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle -- __v is the default in mongodb
        delete ret.__v;
    }
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl).then();

app.use(cors());
app.use(express.json());

// Morgan config
const originalSend = app.response.send;

app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.custombody = body;
};
morgan.token("res-body", (_req, res) =>
    JSON.stringify(res.custombody));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :res-body"));

// ------------ End Morgan config

app.get("/api/blogs", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        })
        .catch(err => logger.error(err));
});

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(err => logger.error(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
