const UserModel = require('../models/userModel');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar os usuários.", error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o usuário.", error });
    }
  },

  addUser: async (req, res) => {
    try {
      const newUser = req.body;
      const [userId] = await UserModel.addUser(newUser);

      const user = await UserModel.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar o usuário.", error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const result = await UserModel.updateUser(id, updatedData);
      if (result === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o usuário.", error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await UserModel.deleteUser(id);
      if (result === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar o usuário.", error });
    }
  }
};

module.exports = UserController;
