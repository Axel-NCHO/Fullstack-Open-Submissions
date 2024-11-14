/* eslint-disable no-undefined -- Needed */

import mongoose from "mongoose";
// eslint-disable-next-line n/no-unsupported-features/node-builtins -- Alright
import { test, beforeEach, after, describe } from "node:test";
import assert from "node:assert";
import helper from "../utils/list_helper.js";
// eslint-disable-next-line n/no-unpublished-import -- Not published
import supertest from "supertest";
import Blog from "../models/blog.js";
import app from "../app.js";

const api = supertest(app);

describe("api", () => {

    beforeEach(async () => {
        await Blog.deleteMany({});

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
        const promises = blogObjects.map(blog => blog.save());

        await Promise.all(promises);
    });

    test("all blogs are served from /api/blogs endpoint", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200);

        assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test("identifier of blog objects is 'id' instead of '_id'", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200);

        assert.notStrictEqual(response.body[0].id, undefined);
        // eslint-disable-next-line no-underscore-dangle -- _id is default in mongodb
        assert.strictEqual(response.body[0]._id, undefined);
    });

    test("blogs are created correctly", async () => {
        const firstGetResponse = await api.get("/api/blogs").expect(200);

        assert.strictEqual(firstGetResponse.body.length, helper.initialBlogs.length);

        const newBlog = {
            title: "Billboard",
            author: "Billboard",
            url: "https://www.billboard.com/",
            likes: 1245
        };
        const postResponse = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/u);

        assert.notStrictEqual(postResponse.body.id, undefined);

        const secondGetResponse = await api.get("/api/blogs").expect(200);
        const content = secondGetResponse.body;

        assert.strictEqual(content.length, helper.initialBlogs.length + 1);

        const filter = content.filter(b => b.title === "Billboard");

        assert.notStrictEqual(filter.length, 0);
        assert.strictEqual(filter[0].title, "Billboard");
        assert.strictEqual(filter[0].author, "Billboard");
        assert.strictEqual(filter[0].url, "https://www.billboard.com/");
        assert.strictEqual(filter[0].likes, 1245);
    });

    test("blog likes defaults to zero if missing at creation", async () => {
        const newBlog = {
            title: "Billboard",
            author: "Billboard",
            url: "https://www.billboard.com/"
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/u);

        const getResponse = await api.get("/api/blogs").expect(200);

        assert.strictEqual(getResponse.body.find(b => b.title === "Billboard").likes, 0);
    });

    test("missing blog title or url is a BadRequest", async () => {
        const newBlog = {
            author: "Billboard"
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/u);
    });

    test("blogs are correctly updated", async () => {
        const r1 = await api.get("/api/blogs").expect(200);
        const blog = r1.body[0];

        const newBlog = {
            title: "Billboard",
            author: "Billboard",
            url: "https://www.billboard.com/"
        };

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(newBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/u);

        const r2 = await api.get("/api/blogs").expect(200);

        assert.strictEqual(r2.body[0].title, "Billboard");
    });

    test("blogs are correctly deleted", async () => {
        const r1 = await api.get("/api/blogs").expect(200);
        const initialCount = r1.body.length;

        await api
            .delete(`/api/blogs/${r1.body[0].id}`)
            .expect(204);

        const r2 = await api.get("/api/blogs").expect(200);

        assert.strictEqual(r2.body.length, initialCount - 1);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});

/* eslint-enable no-undefined -- Needed */
