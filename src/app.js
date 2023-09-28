const express = require('express');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

const knex = require('knex');
const knexConfig = require('./config/knexfile');
const db = knex(knexConfig);

// Middleware para processar dados JSON
app.use(express.json());

// Rotas relacionadas ao estoque
app.use(stockRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
