const express = require("express");

const server = express();

// Para passar um JSON na estruturação
server.use(express.json());

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

const cursos = ["Node JS", "JavaScript", "React Native"];

// middleware global
server.use((req, res, next) => {
  console.log(`url chamada: ${req.url}`);

  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(404).json({ error: "Insira um nome para o curso" });
  }

  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  
  if (!curso) {
    return res.status(404).json({ error: "O curso não existe" });
  }

  return next();
}

server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json(cursos);
});

server.listen(3000);
