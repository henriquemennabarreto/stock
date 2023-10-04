const passport = require('passport');

passport.initialize()
passport.session()

const AuthController = {

  hasActiveLogin: async (req, res, next) => {
    try {
      if (req.user) {
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
    res.send(`Usuário ${req.user.email} logado com sucesso.`)
  },

  failed: async (req, res) => {
    res.status(401).json({ message: "Falha na autenticação." });
  }
};

module.exports = AuthController;
