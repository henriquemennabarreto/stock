const express = require('express');

const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

const knex = require('knex');
const knexConfig = require('./config/knexfile');
const db = knex(knexConfig);

app.use(express.json());

app.use(userRoutes);
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
