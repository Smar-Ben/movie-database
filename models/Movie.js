const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Update d'un perso
const Movie = new Schema({
    TITRE: { type: String },
    ANNEE: { type: Number },
    CATEGORIE: { type: String },
    GENRE: { type: String },
    REALISATEUR: { type: String },
    ORIGINE: { type: Array },
    ACTEUR: { type: Array },
    CLASSEUR: { type: String },
    NUMERO: { type: String },
    TYPE: { type: String },
    ZONE: { type: String },
    LANGUE: { type: Array },
    COMMENTAIRES: { type: String },
    VOIR: { type: String },
});
Movie.index({ TITRE: 1, ANNEE: 1 }, { unique: true });
module.exports = mongoose.model("Movie", Movie);
