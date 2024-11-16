const fs = require("fs");

// Función para registrar cita
const registrar = (nombreDelArchivo, nombre, edad, tipo, color, enfermedad) => {
  const citaVet = {
    Nombre: nombre,
    Edad: edad,
    Tipo: tipo,
    Color: color,
    Enfermedad: enfermedad,
  };
  // Leer las citas existentes
  let citas = [];
  try {
    const data = fs.readFileSync(nombreDelArchivo, "utf-8");
    citas = JSON.parse(data);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  // Agregar la nueva cita
  citas.push(citaVet);

  // Guardar todas las citas en el archivo
  fs.writeFileSync(nombreDelArchivo, JSON.stringify(citas, null, 2), "utf-8");
};

//Función para leer las citas
const leerCita = (nombreDelArchivo) => {
  try {
    let citas = JSON.parse(fs.readFileSync("citas.json", "utf-8"));
    console.log("Citas registradas:", citas);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No hay citas registradas aún.");
    } else {
      throw error;
    }
  }
};

// Obtener argumentos de la consola
const args = process.argv.slice(2);
const operacion = args[0];
const nombreDelArchivo = "citas.json";

if (operacion === "registrar") {
  const [_, nombre, edad, tipo, color, enfermedad] = args;
  if (!nombre || !edad || !tipo || !color || !enfermedad) {
    console.log(
      "Por favor, proporciona todos los argumentos necesarios: nombre, edad, tipo, color, enfermedad."
    );
  } else {
    registrar(nombreDelArchivo, nombre, edad, tipo, color, enfermedad);
    console.log("Cita registrada con éxito.");
  }
} else if (operacion === "leer") {
  leerCita(nombreDelArchivo);
} else {
  console.log(
    "Operación no válida. Usa 'registrar' para añadir una cita o 'leer' para visualizar las citas."
  );
}

module.exports = { registrar, leerCita };
