const fs = require("fs");

const citas = [];

fs.writeFileSync("citas.json", JSON.stringify(citas));

const { registrar, leerCita } = require("./operaciones");
