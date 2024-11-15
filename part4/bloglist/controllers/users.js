import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// eslint-disable-next-line new-cap -- Router is default in express
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    const users = await User
        .find({})
        .populate("blogs", { title: 1, url: 1, author: 1 });

    res.json(users);
});

usersRouter.post("/", async (req, res) => {
    const { username, name, passwordClear } = req.body;

    if (!username || !passwordClear) {
        res.status(400).send({ error: "Missing username or password" });
        return;
    }

    if (username.length < 3 && passwordClear.length < 3) {
        res.status(400).send({ error: "Username and password must be at least 3 characters longs" });
        return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(passwordClear, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

export default usersRouter;
