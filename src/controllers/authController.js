const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const SECRET = '448a852ec16449869e0101fa7ea9e0ad';

const AuthController = {

  login: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400 // Token expira em 24 horas
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Erro ao gerar o token.", error });
    }
  },

  hasActiveLogin: async (req, res, next) => {
    try {
      let token = req.headers['x-access-token'] || req.headers['authorization'];

      if (req.user) {
        next();
      } else if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        const decoded = jwt.verify(token, SECRET);

        req.userId = decoded.id;

        next();
      } else {
        res.status(401).json({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      res.status(401).json({ message: "Não autorizado.", error });
    }
  },

  logout: async (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  },

  success: async (req, res) => {
    const token = jwt.sign({ id: req.user.email }, SECRET, {
      expiresIn: 86400 // Token expira em 24 horas
    });
    res.status(200).json({ user: req.user.email, token });
  },

  failed: async (req, res) => {
    res.status(401).json({ message: "Falha na autenticação." });
  }
};

module.exports = AuthController;
