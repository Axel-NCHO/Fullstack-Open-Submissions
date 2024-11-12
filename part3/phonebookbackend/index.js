import express from "express";
import morgan from "morgan";
import cors from "cors";
import personService from "./services/person.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

const originalSend = app.response.send;

app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.custombody = body;
};
morgan.token("res-body", (_req, res) =>
    JSON.stringify(res.custombody));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :res-body"));

app.use(cors());

app.use(express.static("dist"));

const phonebookEntries = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

// const generateId = () => {
//     const minCeiled = Math.ceil(5);
//     const maxFloored = Math.floor(10_000);
//     return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
// }

app.get("/api/persons", (req, res, next) => {
    personService.getAllPeople()
        .then(results => res.json(results))
        .catch(err => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
    personService
        .findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).end();
            }
        })
        .catch(err => next(err));

});

app.post("/api/persons", (req, res, next) => {
    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number) {
        res.status(400).send({ error: "Missing name or number" });
        return;
    }
    const potential = phonebookEntries.find(p => p.name === name);

    if (potential) {
        res.status(409).send({ error: `Name ${name} is already in use` });
        return;
    }

    const person =
        {
            name: req.body.name,
            number: req.body.number
        };

    personService
        .createNewPerson(person)
        .then(() => res.status(201).json(person))
        .catch(err => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
    personService
        .updateById(req.params.id,
            {
                name: req.body.name,
                number: req.body.number
            })
        .then(result => res.json(result))
        .catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
    personService
        .deleteById(req.params.id)
        .then(() => res.status(204).end())
        .catch(err => next(err));
});

app.get("/info", (req, res) => {
    res.send(
        `<div>
                    <p>Phonebook has info for ${phonebookEntries.length} people</p>
                    <p>${new Date()}</p>
               </div> `
    );
});

// eslint-disable-next-line jsdoc/require-returns -- Handler does not return anything
/**
 * Handler for unknown endpoints
 * @param {express.Request} req  request
 * @param {express.Response} res response
 */
function unknownEndpoint(req, res) {
    res.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

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

app.use(errorHandler);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console -- Needed for debugging
    console.log(`Server running on port ${PORT}`);
});
