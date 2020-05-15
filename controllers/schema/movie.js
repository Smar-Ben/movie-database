module.exports = {
    create: {
        TITRE: {
            in: "body",
        },
        CATEGORIE: {
            in: "body",
        },
        GENRE: {
            in: "body",
            optional: true,
        },
        REALISATEUR: {
            in: "body",
            optional: true,
        },
        ORIGINE: {
            in: "body",
        },
        ACTEUR: {
            in: "body",
            optional: true,
        },
        CLASSEUR: {
            in: "body",
        },
        NUMERO: {
            in: "body",
            optional: true,
        },
        TYPE: {
            in: "body",
            check: (str) => str === "DVD" || str === "BRD" || str === "BRD + DVD",
        },
        ZONE: {
            in: "body",
            check: (num) => num > 0 && num <= 6,
        },
        ANNEE: {
            in: "body",
        },
        LANGUE: {
            in: "body",
            optional: true,
        },
        COMMENTAIRES: {
            in: "body",
            optional: true,
        },
        VOIR: {
            in: "body",
            optional: true,
        },
    },
};
