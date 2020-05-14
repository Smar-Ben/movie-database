const movies = require("./movie");

module.exports = function (app) {
    app.get("/", movies.getMovieList);
    app.get("/:id", movies.searchMoviebyId);
    app.post("/", movies.addMovie);
    app.get("/:id", movies.modifyMovie);
    app.delete("/:id", movies.deleteMovie);
};
