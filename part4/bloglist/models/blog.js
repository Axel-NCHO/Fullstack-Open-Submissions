import mongoose from "mongoose";

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

export default Blog;
