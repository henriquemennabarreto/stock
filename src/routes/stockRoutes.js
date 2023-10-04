const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authController = require('../controllers/authController');

// Rota para listar todos os produtos
router.get('/stock', authController.hasActiveLogin, stockController.getAllItems);

// Rota para obter um produto específico pelo ID
router.get('/stock/:id', authController.hasActiveLogin, stockController.getItemById);

// Rota para adicionar um novo produto
router.post('/stock', authController.hasActiveLogin, stockController.addItem);

// Rota para atualizar um produto específico pelo ID
router.put('/stock/:id', authController.hasActiveLogin, stockController.updateItem);

// Rota para deletar um produto específico pelo ID
router.delete('/stock/:id', authController.hasActiveLogin, stockController.deleteItem);

module.exports = router;
