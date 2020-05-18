// injecte fonction utilitire dans app express pour renvoyer des errreurs
const middleware = (req, res, next) => {
    res.error = (err) => {
        err = handleMongooseError(err);
        const httpCode = err.httpCode || 500;
        //on met des log si il y a une erreur interne du serveur
        if (httpCode === 500) {
            Log.error(err.stack || err.message || err);
        }
        //on envoie l'erreur en format JSON
        const response = {
            error: err.message,
            code: err.internalCode || null,
        };
        res.status(httpCode).json(response);
    };
    next();
};

// si l'erreur est une erreur mongoose renvoie l'erreur custom correspondante
// sinon renvoie l'objet erreur intact
const handleMongooseError = (err) => {
    if (err.name === "ValidationError") {
        return new ValidationError(err.message);
    } else {
        return err;
    }
};

// generic custom error / don't instanciate from this class, use children!
class CustomError extends Error {
    constructor(message, httpCode, internalCode) {
        super(message);
        this.httpCode = httpCode;
        this.internalCode = internalCode;
    }
}

// custom error types extending js error class
class InternError extends CustomError {
    constructor(message = "Intern error") {
        super(message, 500, 5000);
    }
}
class NotFoundError extends CustomError {
    constructor(message = "Not found") {
        super(message, 404, 4040);
    }
}
class ValidationError extends CustomError {
    constructor(message = "Invalid data") {
        super(message, 400, 4000);
    }
}

module.exports = {
    middleware,
    InternError,
    NotFoundError,
    ValidationError,
};
