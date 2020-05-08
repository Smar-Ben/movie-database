const fs = require("fs");

/* fs.createReadStream("films.csv")
    .pipe(csv())
    .on("data", (row) => {
        if (typeof row[0] !== "string") {
        }
        console.log(i,  row[0]);
        i++;
    })
    .on("end", () => {
        console.log("CSV file successfully processed");
    });
 */
const futureJSONFile = [];
const nameAttribute = [];

const content = fs.readFileSync("./file/films.csv", "utf8");
const row = content.split("\n");
for (let i = 0; i < row.length - 1; i++) {
    const inter = row[i].split(";");
    if (i === 0) {
        for (j = 0; j < inter.length - 1; j++) {
            if (inter[j] !== "") {
                nameAttribute.push(inter[j].trim());
            }
        }
    } else {
        const film = {};
        for (j = 0; j < nameAttribute.length; j++) {
            if (
                nameAttribute[j] === "ACTEUR" ||
                nameAttribute[j] === "ORIGINE" ||
                nameAttribute[j] === "LANGUE"
            ) {
                const interList = inter[j].split("-");
                const tab = [];
                for (let k = 0; k < interList.length; k++) {
                    tab.push(interList[k].trim());
                }
                film[nameAttribute[j]] = tab;
            } else if (nameAttribute[j] === "ANNEE" || nameAttribute[j] === "ZONE") {
                film[nameAttribute[j]] = parseInt(inter[j]);
            } else {
                film[nameAttribute[j]] = inter[j];
            }
        }
        futureJSONFile.push(film);
    }
}

fs.writeFileSync("./file/film.json", JSON.stringify(futureJSONFile));
