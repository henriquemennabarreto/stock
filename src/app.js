const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport.js');

const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

const knex = require('knex');
const knexConfig = require('./config/knexfile');
const db = knex(knexConfig);

app.use(express.json());

app.use(userRoutes);
app.use(stockRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Usuário não logado.');
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
