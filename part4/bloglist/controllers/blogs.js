import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";

// eslint-disable-next-line new-cap -- Router is default in express
const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    if (!request.user) {
        response.status(401).send({ error: "Missing authentication token" });
        return;
    }

    if (!request.body.title || !request.body.url) {
        response.status(400).send({ error: "Missing title or url" });
        return;
    }

    const user = await User.findById(request.user);

    // Default likes to 0 if missing
    request.body.likes = request.body.likes
        ? request.body.likes
        : 0;

    const blog = new Blog({
        ...request.body,
        // eslint-disable-next-line no-underscore-dangle -- default in mongodb
        user: user._id
    });
    const newBlog = await blog.save();

    // eslint-disable-next-line no-underscore-dangle -- default in mongodb
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();

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
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        response.status(404).send({ error: "Blog not found" });
        return;
    }

    if (blog.user.toString() !== request.user) {
        response.status(403).send({ error: "You are not allowed to perform this action" });
        return;
    }
    // eslint-disable-next-line no-underscore-dangle -- _id is default in mongodb
    await Blog.findByIdAndDelete(blog._id);
    response.status(204).end();
});

export default blogsRouter;
