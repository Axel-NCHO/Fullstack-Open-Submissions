import express from "express";
import Blog from "../models/blog.js";

// eslint-disable-next-line new-cap -- Router is default in express
const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {

    if (!request.body.title || !request.body.url) {
        response.status(400).send({ error: "Missing title or url" });
        return;
    }

    // Default likes to 0 if missing
    request.body.likes = request.body.likes
        ? request.body.likes
        : 0;

    const blog = new Blog(request.body);
    const newBlog = await blog.save();

    response.status(201).json(newBlog);
});

blogsRouter.put("/:id", async (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).send({ error: "Missing title or url" });
        return;
    }

    const newBlog = {
        ...request.body,
        likes: request.body.likes ? request.body.likes : 0
    };
    const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog);

    response.status(200).json(updated);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

export default blogsRouter;
