const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const { ValidationError, InternError } = require("./error");
async function checkSchema(req, schema) {
    if (!schema) {
        return true;
    }
    if (req.method.toLowerCase() === "post" && Object.keys(req.body).length === 0) {
        throw new ValidationError("You send an empty post request");
    }
    let numTotal = 0;
    let numRequired = 0;
    Object.keys(schema).forEach((el) => {
        if (schema[el].in === "body") {
            numTotal++;
            if (!schema[el].optional) {
                numRequired++;
            }
        }
    });
    Object.keys(req.body).forEach((key) => {
        if (!schema[key]) {
            throw new InternError(`Invalid field in schema (field :${key})`);
        } else {
            numTotal--;
            if (!schema[key].optional) {
                numRequired--;
            }
        }
    });
    if (numRequired !== 0) {
        throw new ValidationError("You dont have fill enough field to create a new movie");
    }
}

exports.checkSchema = checkSchema;
