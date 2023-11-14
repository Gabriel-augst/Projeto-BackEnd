const express = require('express');

const pizzaRouter = express.Router();

let pedido = [
    {sabor: "Calabresa", tamanho: "P", valor: 15.3},
    {sabor: "Portuguesa", tamanho: "M", valor: 22.3},
    {sabor: "Calabresa", tamanho: "G", valor: 35.3}
];

// Listar Pizzas
pizzaRouter.get('/pedido', (req, res) => {
    return res.json(pedido);
});

// Listar uma Pizza
pizzaRouter.get('/pedido/:id', (req, res) => {
    let { id } = req.params;
    
    return res.json(pedido[id-1]);
});

// Cadastrar uma Pizza
pizzaRouter.post('/pedido/cadastrar', (req, res) => {
    const pizza = req.body;

    pedido.push(pizza);

    return res.json(pedido);
});

// Atualiza o sabor de uma Pizza
pizzaRouter.put('/pedido/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { atributo, valor } = req.body;

    if (atributo == "sabor") {
        pedido[id-1].sabor = valor;
    } else if (atributo == "tamanho") {
        pedido[id-1].tamanho = valor;
    } else if (atributo == "valor") {
        pedido[id-1].valor = valor;
    }

    return res.json(pedido);
});

// Deletar uma Pizza
pizzaRouter.delete('/pedido/deletar/:id', (req, res) => {
    const { id } = req.params;

    pedido.splice(id, 1);
    return res.json({"message": "A pizza foi deletada"});
});

module.exports = pizzaRouter;
