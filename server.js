const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/movie";
const Movie = require("./models/Movie");
const { middleware } = require("./services/error");
const Log = require("./services/log");
//connection à la base de données
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.once("open", (_) => {
    Log.info(`Database connected: ${url}`);
});
db.on("error", (err) => {
    Log.error(`connection error: ${err}`);
});
//installation des middlewares de base

try {
    const app = express();

    const urlencodedParser = bodyParser.urlencoded({
        extended: true,
    });
    app.use(urlencodedParser);

    app.use(bodyParser.json());

    app.use(middleware);

    //création de la route pour accéder au film de notre bdd
    const routerMovie = express.Router();
    app.use("/movies", routerMovie);

    require(__dirname + "/controllers/index")(routerMovie);

    const port = 8800;
    app.listen(port, () => Log.info(`API running on port ${port}`));
} catch (err) {
    Log.error("Error while starting app");
    Log.error(err);
}
