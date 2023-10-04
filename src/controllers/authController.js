const passport = require('passport');

const AuthController = {

  login: async (req, res) => {
    try {
      passport.authenticate('google', {
        scope:
          ['email', 'profile']
      })
    } catch (error) {
      res.status(500).json({ message: "Erro ao gerar o token.", error });
    }
  },

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
    res.status(401).json({ message: "Falha na autenticação.", error });
  }
};

module.exports = AuthController;
