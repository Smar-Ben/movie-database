const Chai = require("chai");
const { expect, assert } = Chai;
const MovieData = require("./testData");
const ChaiHttp = require("chai-http");
Chai.use(ChaiHttp);
const App = require("../server");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.ObjectId;

const assertMovie = (movie) => {
    expect(movie).to.be.an("object");
    expect(movie).to.have.property("_id");
    expect(movie).to.have.property("TITRE");
    expect(movie.TITRE).to.be.an("string");
    expect(movie).to.have.property("TITRE_CAMELCASE");
    expect(movie.TITRE_CAMELCASE).to.be.an("string");
    expect(movie).to.have.property("ANNEE");
    expect(movie).to.have.property("CATEGORIE");
    expect(movie).to.have.property("GENRE");
    expect(movie).to.have.property("REALISATEUR");
    expect(movie).to.have.property("ORIGINE");
    expect(movie.ORIGINE).to.be.an("array");
    expect(movie).to.have.property("ACTEUR");
    expect(movie.ACTEUR).to.be.an("array");
    expect(movie).to.have.property("NUMERO");
    expect(movie).to.have.property("TYPE");
    expect(movie).to.have.property("ZONE");
    expect(movie).to.have.property("LANGUE");
    expect(movie.LANGUE).to.be.an("array");
    expect(movie).to.have.property("COMMENTAIRES");
    expect(movie).to.have.property("VOIR");
};

describe("API movie test", () => {
    const movie = MovieData.movieData;
    let id;
    describe("GET /movies/", () => {
        it("should return an array", async () => {
            const response = await Chai.request(App).get(`/movies`);
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            const body = response.body;
            expect(body).to.be.an("array");
            expect(body).to.have.lengthOf.above(0);
            body.forEach((el, index) => {
                assertMovie(el);
            });
        });
    });
    describe("POST /movies/", () => {
        it("should trhow intern error", async () => {
            const response = await Chai.request(App)
                .post(`/movies`)
                .send({ ...movie[0], LADING: "qslmqsd" });
            expect(response).to.have.status(500);
        });
        it("should trhow validation error", async () => {
            const response = await Chai.request(App).post(`/movies`).send({ TITRE: "LALALA" });
            expect(response).to.have.status(400);
        });
        it("should add a new movie", async () => {
            const response = await Chai.request(App)
                .post(`/movies`)
                .send(JSON.parse(JSON.stringify(movie[0])));
            id = response.body._id;
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            const body = response.body;
            expect(body).to.be.an("object");
            assertMovie(body);
        });
    });

    describe("GET /movies/:id", () => {
        it("should trhow intern error", async () => {
            const response = await Chai.request(App).get(`/movies/b`);
            expect(response).to.have.status(500);
        });
        it("should trhow not found error", async () => {
            const unknownMongoId = Mongoose.Types.ObjectId();
            const response = await Chai.request(App).get(`/movies/${unknownMongoId}`);
            expect(response).to.have.status(404);
        });
        it("should get a movie", async () => {
            const response = await Chai.request(App)
                .get(`/movies/${id}`)
                .send(JSON.parse(JSON.stringify(movie[0])));
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            const body = response.body;
            expect(body).to.be.an("object");
            assertMovie(body);
        });
    });

    describe("POST /movies/:id", () => {
        it("should trhow intern error", async () => {
            const response = await Chai.request(App)
                .post(`/movies/${id}`)
                .send({ ...movie[0], LADING: "qslmqsd" });
            expect(response).to.have.status(500);
        });
        it("should trhow validation error", async () => {
            const response = await Chai.request(App).post(`/movies`).send({ TITRE: "LALALA" });
            expect(response).to.have.status(400);
        });
        it("should trhow not found error", async () => {
            let newMovie = { ...movie[0] };
            newMovie.TITRE = "llllll";
            const unknownMongoId = Mongoose.Types.ObjectId();
            const response = await Chai.request(App)
                .post(`/movies//${unknownMongoId}`)
                .send(JSON.parse(JSON.stringify(newMovie)));
            expect(response).to.have.status(404);
        });
        it("should add a new movie", async () => {
            let newMovie = { ...movie[0] };
            newMovie.TITRE = "llllll";
            const response = await Chai.request(App)
                .post(`/movies//${id}`)
                .send(JSON.parse(JSON.stringify(newMovie)));
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            const body = response.body;
            expect(body).to.be.an("object");
            assertMovie(body);
            expect(body.TITRE).equal("llllll");
        });
    });

    describe("DELETE /movies/:id", () => {
        it("should trhow intern error", async () => {
            const response = await Chai.request(App).delete(`/movies/b`);
            expect(response).to.have.status(500);
        });
        it("should trhow not found error", async () => {
            const unknownMongoId = Mongoose.Types.ObjectId();
            const response = await Chai.request(App).delete(`/movies/${unknownMongoId}`);
            expect(response).to.have.status(404);
        });
        it("should delete a movie", async () => {
            const response = await Chai.request(App).delete(`/movies/${id}`);
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            const body = response.body;
            expect(body).to.be.an("object");
            assertMovie(body);
        });
    });
});
