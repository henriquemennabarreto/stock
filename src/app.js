const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport.js');
const cors = require('cors')
const multer = require('multer');
const redis = require('redis');
const { promisify } = require('util');
const base64 = require('node-base64-image');

const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

app.use(cors())

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/google', passport.authenticate('google', {
  scope:
    ['email', 'profile']
}));

app.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed',
  }),
  function (req, res) {
    res.redirect('/success')
  }
);

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhuma imagem enviada.');
    }

    let url = `http://localhost:3000/image/${req.file.originalname}`
    const image = await base64.encode(url, {string: true});
    
    await redisClient.set(req.file.originalname, image);

    res.status(200).send('Imagem armazenada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao armazenar a imagem.');
  }
});

app.get('/image/:filename', async (req, res) => {
  try {
    const imageData = await redisClient.get(req.params.filename);

    if (!imageData) {
      return res.status(404).send('Imagem não encontrada.');
    }

    res.json(imageData);
  } catch (error) {
    res.status(500).send('Erro ao recuperar a imagem.');
  }
});

const knex = require('knex');
const knexConfig = require('./config/knexfile');
const db = knex(knexConfig);

app.use(express.json());

app.use(userRoutes);
app.use(stockRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.status(401).json({ message: "Usuário não logado." });
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
