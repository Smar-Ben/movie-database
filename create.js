const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/movie";
//const fs = require("fs");
const json = require("./file/film.json");
const Movie = require("./models/Movie");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected:", url);
});

db.on("error", (err) => {
    console.error("connection error:", err);
});
/* async function runCode() {
    return await Movie.deleteMany({});
}
runCode().catch((error) => {
    console.error(error);
});
 */
json.forEach((el) => {
    Movie.collection.insertOne(el, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    });
});

/* async function findApril() {
    const doc = await Movie.find({ TITRE: "Enchanted April" });
    console.log(doc);
}
findApril().catch((error) => {
    console.error(error);
});
 */
