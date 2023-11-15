const express = require('express');
const pizzaRouter = express.Router();

let pedido = []

// Listar Pedidos
pizzaRouter.get('/pedidos', (req, res) => {
    return res.json(pedido);
});

// Listar um Pedido
pizzaRouter.get('/pedidos/:id', (req, res) => {
    let { id } = req.params;
    
    return res.json(pedido[id]);
});

// Cadastrar um Pedido
pizzaRouter.post('/pedidos/cadastrar', (req, res) => {
    const { sabor, tamanho, valor } = req.body;

    // Crie uma nova instância de Pizza
    const novaPizza = {
        id: pedido.length,
        sabor,
        tamanho,
        valor
    };

    // Adicione a nova pizza à lista de pedidos
    pedido.push(novaPizza);

    return res.json({ message: 'Pedido cadastrado com sucesso', Pedido: novaPizza });
});

// Atualizar um Pedido
pizzaRouter.put('/pedidos/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { sabor, tamanho} = req.body;

    // Encontre a pizza no pedido com base no ID
    const pizza = pedido.find(pizza => pizza.id === Number(id));

    // Verifique se a pizza existe no pedido
    if (!pizza) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
    }

    // Atualize os atributos fornecidos na requisição, se estiverem presentes
    if (sabor) {
        pizza.sabor = sabor;
    }
    if (tamanho) {
        pizza.tamanho = tamanho;
    }

    // Retorna apenas os atributos necessários na resposta
    const pizzaAtualizada = {
        id: pizza.id,
        sabor: pizza.sabor,
        tamanho: pizza.tamanho,
        valor: pizza.valor
    };

    return res.json({ message: 'Pedido atualizado com sucesso', Pedido: pizzaAtualizada });
});

// Rota para aplicar desconto de 10% em pizzas tamanho "G"
pizzaRouter.put('/pedidos/desconto/G', (req, res) => {
    const descontoPercentual = 0.10; // 10%

    // Filtra as pizzas na lista que têm o tamanho "G"
    const pizzasTamanhoG = pedido.filter(pizza => pizza.tamanho.toUpperCase() === 'G');

    // Verifica se há pizzas para aplicar desconto
    if (pizzasTamanhoG.length === 0) {
        return res.status(404).json({ message: 'Não há pizzas de tamanho G na lista' });
    }

    // Aplica o desconto de 10% às pizzas encontradas
    pizzasTamanhoG.forEach(pizza => {
        pizza.valor -= pizza.valor * descontoPercentual;
    });

    // Retorna a lista atualizada com desconto
    return res.json({ message: 'Desconto de 10% aplicado às pizzas de tamanho G', pedido});
});


// Deletar um Pedido
pizzaRouter.delete('/pedidos/deletar/:id', (req, res) => {
    const { id } = req.params;

     // Encontre o índice da pizza no pedido com base no ID
    const pizza = pedido.findIndex(pizza => pizza.id === Number(id));

    // Verifique se a pizza existe no pedido
    if (pizza === -1) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
    }

    // Remova a pizza da lista de pedidos usando o índice encontrado
    const pizzaRemovida = pedido.splice(pizza, 1)[0];

    return res.json({ message: 'Pedido removido com sucesso', Pedido: pizzaRemovida });
});

module.exports = pizzaRouter;
