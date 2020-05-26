const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//Update d'un perso
const Movie = new Schema({
    TITRE: { type: String, required: true },
    TITRE_CAMELCASE: { type: String, required: true },
    ANNEE: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),
    },
    CATEGORIE: { type: String },
    GENRE: { type: String, default: "" },
    REALISATEUR: { type: String, default: "" },
    ORIGINE: { type: Array },
    ACTEUR: { type: Array },
    CLASSEUR: { type: String },
    NUMERO: { type: String, default: "" },
    TYPE: { type: String },
    ZONE: { type: String },
    LANGUE: { type: Array },
    COMMENTAIRES: { type: String, default: "" },
    VOIR: { type: String, default: "" },
});
Movie.index({ TITRE: 1, ANNEE: 1 }, { unique: true });
module.exports = mongoose.model("Movie", Movie);
