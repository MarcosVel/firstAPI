const express = require("express");

const server = express();

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

server.get("/curso/:id", (req, res) => {
  const id = req.params.id;

  return res.json({ curso: `id do curso: ${id}` });
});

server.listen(3000);
