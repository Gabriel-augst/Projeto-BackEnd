# Sistema de Pedidos de Pizza

Sistema que fornece endpoints para operações de gerenciamento de pedidos de pizza desenvolvido durante a disciplina Programação Web Back-end no curso Técnico em Desenvolvimento de Sistemas - IFPI

## Discentes
- Camila Matos
- Gabriel Augusto

## Como Usar

### Criação do Projeto

Este projeto foi criado utilizando o Node.js e o framework Express. Para iniciar um projeto semelhante:

1. Criar a pasta do projeto: `mkdir Projeto-BackEnd`

2. Entrar na pasta: `cd Projeto-BackEnd`

3. Abrir VSCode no projeto: `code .`

4. Inicializar projeto Node: `npm init -y`. Isso gera o arquivo `package.json`

5. Criar pasta `src` na raiz do projeto

6. Criar arquivo `server.js` dentro da pasta **src**

7. Alterar arquivo **package.json**:
  - trocar *"main": "index.js"* por *"main": "src/server.js"*
  - editar script *test* para *"dev": "nodemon src/server.js"*

### Instalação das bibliotecas de dependências

1. Instalar bibliotecas:
  - ExpressJS, CORS, Nodemon: `npm install express cors nodemon`


### Configurações do arquivo **src/server.js**

1. Edite o arquivo **src/server.ts** e adicione o seguinte conteúdo:

```javascript
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
```

### Iniciando o servidor dentro da pasta 
  - Iniciar o servidor: 
    ```bash
    npm run dev
    ```

### Adição dos endpoints GET/POST/PUT/DELETE no arquivo "pizzaRoutes.js"

1. No arquivo **pizzaRoutes.js** adicionamos uma lista de pedidos temporárias.

```javascript
let pedido = []
```
2. No endpoint do tipo GET, ele vai listar todos os pedidos.

```javascript
// Listar Pedidos
pizzaRouter.get('/pedidos', (req, res) => {
    return res.json(pedido);
});
```

3. No endpoint do tipo GET, ele vai listar um único pedido.

```javascript
// Listar um Pedido
pizzaRouter.get('/pedidos/:id', (req, res) => {
    let { id } = req.params;
    
    return res.json(pedido[id]);
});
```

4. No endpoint do tipo POST, ele vai cadastrar um único pedido.

```javascript
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
```

5. No endpoint do tipo PUT, ele vai atualizar um único pedido.

```javascript
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
```

6. No endpoint do tipo PUT, ele vai atualizar os pedidos de tamanho G aplicando um desconto de 10%.

```javascript
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
```
7. No endpoint do tipo DELETE, ele vai deletar um pedido.

```javascript
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
```










