const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const SECRET = '448a852ec16449869e0101fa7ea9e0ad';

const AuthController = {

  generateToken: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Senha inválida." });
      }

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400 // Token expira em 24 horas
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Erro ao gerar o token.", error });
    }
  },

  verifyToken: async (req, res, next) => {
    try {
      let token = req.headers['x-access-token'] || req.headers['authorization'];

      if (!token) {
        return res.status(403).json({ message: "Nenhum token fornecido." });
      }

      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

      const decoded = jwt.verify(token, SECRET);

      req.userId = decoded.id;

      next();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado.", error });
    }
  }
};

module.exports = AuthController;
