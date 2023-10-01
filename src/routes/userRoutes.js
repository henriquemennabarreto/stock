const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Rota para logar
router.post('/users/login', authController.generateToken);

// Rota para listar todos os usuários
router.get('/users', userController.getAllUsers);

// Rota para obter um usuário específico pelo ID
router.get('/users/:id', userController.getUserById);

// Rota para adicionar um novo usuário
router.post('/users', userController.addUser);

// Rota para atualizar um usuário específico pelo ID
router.put('/users/:id', userController.updateUser);

// Rota para deletar um usuário específico pelo ID
router.delete('/users/:id', userController.deleteUser);


module.exports = router;
