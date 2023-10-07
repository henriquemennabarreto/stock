const multer = require('multer');
const redis = require('redis');
const { promisify } = require('util');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuração do cliente Redis
const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

const ImageController = {
  upload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Nenhuma imagem enviada.');
      }

      await setAsync(req.file.originalname, req.file.buffer);

      res.status(200).send('Imagem armazenada com sucesso!');
    } catch (error) {
      res.status(500).send('Erro ao armazenar a imagem.');
    }
  },

  get: async (req, res) => {
    try {
      const imageData = await getAsync(req.params.filename);

      if (!imageData) {
        return res.status(404).send('Imagem não encontrada.');
      }

      res.contentType('image/png');
      res.send(imageData);
    } catch (error) {
      res.status(500).send('Erro ao recuperar a imagem.');
    }
  }
}