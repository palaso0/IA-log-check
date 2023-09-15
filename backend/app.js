const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json({ message: "Test" });
});

app.post("/api/form", (req, res) => {
  const formData = req.body;

  console.log(formData);

  if (formData.company === "") {
    res.status(400).json({ message: "Errorsango papu" });
    return;
  }

  if (formData.name.includes("ñ")) {
    res.status(400).json({ message: "Error de ñ" });
    return;
  }

  let existingErrors = [];
  existingErrors = JSON.parse(fs.readFileSync('../data/correct_data.json'));
  existingErrors = [...existingErrors, formData];
  fs.writeFileSync('../data/correct_data.json', JSON.stringify(existingErrors));

  res.status(200).json({ message: "Datos del formulario recibidos con éxito en correct_data" });
});

app.post("/api/save_request", (req, res) => {
  const formData = req.body;
  console.log('Guardando: ', formData);

  let existingErrors = [];
  existingErrors = JSON.parse(fs.readFileSync('../data/error_data.json'));
  existingErrors = [...existingErrors, formData];
  fs.writeFileSync('../data/error_data.json', JSON.stringify(existingErrors));

  res.status(200).json({ message: "Datos del formulario guardado con éxito en error_data" });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
