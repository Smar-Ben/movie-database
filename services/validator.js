const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

async function checkSchema(req, schema) {
    if (!schema) {
        return true;
    }
    if (req.method.toLowerCase() === "post" && Object.keys(req.body).length === 0) {
        throw new Error("Empty POST body");
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
            throw new Error("attribute doesnt exist");
        } else {
            numTotal--;
            if (!schema[key].optional) {
                numRequired--;
            }
        }
    });
    if (numRequired !== 0) {
        throw new Error("You dont have fill enough field to create a new movie");
    }
}

exports.checkSchema = checkSchema;
