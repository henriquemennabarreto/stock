const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Rota para listar todos os produtos
router.get('/stock', stockController.getAllItems);

// Rota para obter um produto específico pelo ID
router.get('/stock/:id', stockController.getItemById);

// Rota para adicionar um novo produto
router.post('/stock', stockController.addItem);

// Rota para atualizar um produto específico pelo ID
router.put('/stock/:id', stockController.updateItem);

// Rota para deletar um produto específico pelo ID
router.delete('/stock/:id', stockController.deleteItem);

module.exports = router;
