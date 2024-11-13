import logger from "./logger.js";

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
        return;
    }
    if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
        return;
    }

    next(error);
}

export default {
    errorHandler,
    unknownEndpoint,
    requestLogger
};
