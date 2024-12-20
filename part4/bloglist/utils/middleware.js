import logger from "./logger.js";
import jwt from "jsonwebtoken";
import config from "./config.js";

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Get the request logger
 * @param {express.Request} request request
 * @param {express.Response} response response
 * @param {express.NextFunction} next next
 */
function requestLogger(request, response, next) {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
}

// eslint-disable-next-line jsdoc/require-returns -- Handler does not return anything
/**
 * Handler for unknown endpoints
 * @param {express.Request} req  request
 * @param {express.Response} res response
 */
function unknownEndpoint(req, res) {
    res.status(404).send({ error: "unknown endpoint" });
}

// eslint-disable-next-line jsdoc/require-returns -- Handler does not return anything
/**
 * Error handler
 * @param {Error} error error
 * @param {express.Request} req request
 * @param {express.Response} res response
 * @param {express.NextFunction} next next function
 */
function errorHandler(error, req, res, next) {
    if (error.name === "CastError") {
        res.status(400).send({ error: "Malformed id" });
    } else if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
    } else if (error.name === "MongoServerError" && error.message.includes("duplicate key error")) {
        res.status(400).json({ error: "Username already in use" });
    } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({ error: "Invalid authentication token" });
    }

    next(error);
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Extracts the authorization token "Bearer" from the request's headers
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
function tokenExtractor(req, res, next) {
    const auth = req.get("Authorization");

    if (auth && auth.startsWith("Bearer ")) {
        req.token = auth.replace("Bearer ", "");
    } else {
        req.token = null;
    }

    next();
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Returns the user id using the auth bearer token
 * @param {express.Request} req http request
 * @param {express.Response} res http response
 * @param {express.NextFunction} next next function
 */
function userExtractor(req, res, next) {
    const auth = req.get("Authorization");

    if (auth && auth.startsWith("Bearer ")) {
        const token = auth.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, config.env.JWT_SECRET);

        if (!decodedToken.id) {
            res.status(401).send({ error: "Invalid authentication token" });
            return;
        }
        req.user = decodedToken.id;
    } else {
        req.user = null;
    }

    next();
}

export default {
    errorHandler,
    unknownEndpoint,
    requestLogger,
    tokenExtractor,
    userExtractor
};
