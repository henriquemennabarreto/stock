const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Rota para logar
router.get('/google', authController.login);

router.get('/google/callback', authController.callback);

router.get('/logout', authController.logout);

router.get('/success', authController.success);

router.get('/failed', authController.failed);

// Rota para listar todos os usuários
router.get('/users', hasActiveLogin, userController.getAllUsers);

// Rota para obter um usuário específico pelo ID
router.get('/users/:id', hasActiveLogin, userController.getUserById);

// Rota para adicionar um novo usuário
router.post('/users', hasActiveLogin, userController.addUser);

// Rota para atualizar um usuário específico pelo ID
router.put('/users/:id', hasActiveLogin, userController.updateUser);

// Rota para deletar um usuário específico pelo ID
router.delete('/users/:id', hasActiveLogin, userController.deleteUser);


module.exports = router;
