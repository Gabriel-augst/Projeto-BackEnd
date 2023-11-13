const express = require('express');

const server = express();

const cors = require('cors');

const pizzaRouter = require('./Routes/pizzaRoutes');

server.use(cors());
server.use(express.json());
server.use(pizzaRouter);

const PORT = 3000;

server.listen(PORT, (req, res) => {
    console.log('Servidor rodando em http://localhost:3000')
});
