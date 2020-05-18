const Movie = require("../models/Movie");
const Schema = require("./schema/movie");
const Validator = require("../services/validator");
const Mongoose = require("mongoose");
const _ = require("lodash");
const { NotFoundError, InternError } = require("../services/error");
const ObjectId = Mongoose.Types.ObjectId;

const MovieController = {
    async getMovieList(req, res) {
        try {
            const list = await Movie.find();

            res.status(200).json(list);
        } catch (error) {
            res.error(error);
        }
    },
    async getMovieId(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            throw new InternError("You didn't give a good id as a paramaters");
        }
        const newMovie = await Movie.findOne({ _id: req.params.id });
        if (!newMovie) {
            throw new NotFoundError("Movie not Found");
        } else {
            return newMovie;
        }
    },
    async searchMoviebyId(req, res) {
        try {
            const movie = await MovieController.getMovieId(req, res);
            return res.status(200).json(movie);
        } catch (error) {
            res.error(error);
        }
    },
    async addMovie(req, res) {
        try {
            console.log(req.body);
            await Validator.checkSchema(req, Schema.create);
            const newMovie = await new Movie({
                ...req.body,
                TITRE_CAMELCASE: _.camelCase(req.body.TITRE),
            }).save();
            //vérification du body
            //ajout  du film dans la liste
            Log.info(`Movie ${newMovie._id} created`);
            return res.status(200).json(newMovie);
        } catch (error) {
            res.error(error);
        }
    },
    async modifyMovie(req, res) {
        try {
            await Validator.checkSchema(req, Schema.create);
            if (!ObjectId.isValid(req.params.id)) {
                throw new InternError("You didn't give a good id as a paramaters");
            }
            const updatedMovie = await Movie.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                { ...req.body, TITRE_CAMELCASE: _.camelCase(req.body.TITRE) },
                {
                    new: true,
                }
            );
            if (updatedMovie) {
                Log.info(`Movie ${updatedMovie._id} edited`);
                return res.status(200).json(updatedMovie.toJSON());
            } else {
                throw new NotFoundError("Movie not Found");
            }
            //vérification du body
            //ajout du film dans la liste
        } catch (error) {
            res.error(error);
        }
    },
    async deleteMovie(req, res) {
        try {
            const movie = await MovieController.getMovieId(req, res);
            if (movie) {
                const deleted = await movie.remove();
                Log.info(`Movie ${movie._id} deleted`);
                return res.status(200).json(deleted.toJSON());
            } else {
                throw new NotFoundError("Movie not Found");
            }
        } catch (error) {
            res.error(error);
        }
    },
};

//5ebe9bef95d0ec0810008fc6
module.exports = MovieController;
