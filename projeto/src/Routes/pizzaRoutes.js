const express = require('express');

const pizzaRouter = express.Router();

let pizzas = {
    id: [0, 1, 2, 3],
    sabor: ["Portuguesa", "Calabresa", "Mista", "Calabresa"],
    tamanho: ["G", "P", "M", "G"],
    valor: [12.5, 22.4, 45.4, 34.5]
}

// {Sabor: {pizzas.sabor[id]}

// Listar Pizzas
pizzaRouter.get('/pizzas', (req, res) => {
    return res.json(pizzas);
});

// Listar uma Pizza
pizzaRouter.get('/pizzas/:id', (req, res) => {
    const { id } = req.params;
    
    const pizza = {
        Sabor: pizzas.sabor[id],
        Tamanho: pizzas.tamanho[id],
        Valor: pizzas.valor[id]
    }

    return res.json(pizza);
});

// Cadastrar uma Pizza
pizzaRouter.post('/pizzas/cadastrar', (req, res) => {
    const { nome } = req.body;
    pizzas.push(nome);

    return res.json(pizzas);
});

// Atualizar uma Pizza
pizzaRouter.put('/pizzas/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    pizzas[id] = nome;

    return res.json(pizzas);
});

// Deletar uma Pizza
pizzaRouter.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    usuarios.splice(id, 1);
    return res.json({"message": "O pedido foi deletado"});
});

module.exports = pizzaRouter;