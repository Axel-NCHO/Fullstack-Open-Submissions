import express from "express";
import Blog from "../models/blog.js";

// eslint-disable-next-line new-cap -- Router is default in express
const blogsRouter = express.Router();

blogsRouter.get("/", (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        })
        .catch(err => next(err));
});

blogsRouter.post("/", (request, response, next) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(err => next(err));
});

export default blogsRouter;
