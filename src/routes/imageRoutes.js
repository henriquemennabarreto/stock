const express = require('express');
const multer = require('multer');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController'); // Supondo que você tenha um controlador de upload

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para fazer upload de imagem
router.post('/upload', upload.single('image'), uploadController.uploadImage);
// router.post('/upload', authController.hasActiveLogin, upload.single('image'), uploadController.uploadImage);

// Rota para obter imagem convertida em Base64
router.get('/image/:filename', uploadController.getImage);
// router.get('/image/:filename', authController.hasActiveLogin, uploadController.getImage);

module.exports = router;