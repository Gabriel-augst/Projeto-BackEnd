const express = require('express');

const Pizza = require('./classe.js');

const pizzaRouter = express.Router();

let menu = [
    new Pizza(0, "Portuguesa", "P", 18.5),
    new Pizza(1, "Calabresa", "M", 22.5),
    new Pizza(2, "Portuguesa", "G", 25.5),
    new Pizza(3, "Mista", "P", 15.5)
]

// Listar Pizzas
pizzaRouter.get('/pizzas', (req, res) => {
    return res.json(menu);
});

// Listar uma Pizza
pizzaRouter.get('/pizzas/:id', (req, res) => {
    let { id } = req.params;
    
    return res.json(menu[id]);
});

// Cadastrar uma Pizza
pizzaRouter.post('/pizzas/cadastrar', (req, res) => {
    const pizza = req.body;

    const id = menu.length + 1;
    nova_pizza = new Pizza(id, pizza.sabor, pizza.tamanho, pizza.valor);
    menu.push(nova_pizza);

    return res.json(menu);
});

// Atualiza o sabor de uma Pizza
pizzaRouter.put('/pizzas/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { sabor } = req.body;

    menu[id].sabor = sabor;

    return res.json(menu);
});

// Deletar uma Pizza
pizzaRouter.delete('/pizzas/deletar/:id', (req, res) => {
    const { id } = req.params;

    menu.splice(id, 1);
    return res.json({"message": "A pizza foi deletada"});
});

module.exports = pizzaRouter;
