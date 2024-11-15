import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import config from "../utils/config.js";

// eslint-disable-next-line new-cap -- Router is default in express
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const validIdentity = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!validIdentity) {
        res.status(401).send({ error: "Invalid Credentials" });
    }

    const userInfoForToken = {
        username,
        // eslint-disable-next-line no-underscore-dangle -- _id default in mongodb
        id: user._id
    };

    const token = jwt.sign(userInfoForToken, config.env.JWT_SECRET);

    res
        .status(200)
        .send({ token, username, name: user.name });
});

export default loginRouter;
