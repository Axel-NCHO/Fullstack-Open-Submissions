import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";
import blogsRouter from "./controllers/blogs.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";

mongoose.set("strictQuery", false);

logger.info("Connecting to Mongo database");

mongoose.connect(config.env.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch(err => {
        logger.error("Error connecting to MongoDB", err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
