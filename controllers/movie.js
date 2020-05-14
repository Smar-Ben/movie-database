const Movie = require("../models/Movie");
const Schema = require("./schema/movie");
const Validator = require("../services/validator");
async function getMovieList(req, res) {
    try {
        const list = await Movie.find();
        console.log(list);
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getMovieId(req, res) {
    try {
        return await Movie.findOne({ _id: req.params.id });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
async function searchMoviebyId(req, res) {
    try {
        const movie = await getMovieId(req, res);
        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function addMovie(req, res) {
    try {
        console.log(req.body);
        await Validator.checkSchema(req, Schema.create);
        const newMovie = await new Movie(req.body).save();
        //vérification du body
        //ajout  du film dans la liste
        return res.status(200).json(newMovie);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

async function modifyMovie(req, res) {
    try {
        console.log(req.body);
        await Validator.checkSchema(req, Schema.create);
        const updatedMovie = await Movie.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            req.body,
            {
                new: true,
            }
        );
        if (updatedMovie) {
            return res.status(200).json(updatedMovie.toJSON());
        } else {
            throw new Error("erreur");
        }
        //vérification du body
        //ajout du film dans la liste
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function deleteMovie(req, res) {
    try {
        const movie = await getMovieId(req, res);
        const deleted = await movie.remove();
        return res.status(200).json(deleted.toJSON());
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.getMovieList = getMovieList;
exports.searchMoviebyId = searchMoviebyId;
exports.addMovie = addMovie;
exports.modifyMovie = modifyMovie;
exports.deleteMovie = deleteMovie;
