const knex = require('knex');
const knexConfig = require('../config/knexfile');

const db = knex(knexConfig);

const tableName = 'users';

const UserModel = {
  // Buscar todos os usuários
  getAllUsers: () => db(tableName).select('*'),

  // Buscar um usuário por ID
  getUserById: (id) => db(tableName).where('id', id).first(),

  // Adicionar novo usuário
  addUser: (user) => db(tableName).insert(user),

  // Atualizar um usuário
  updateUser: (id, user) => db(tableName).where('id', id).update(user),

  // Deletar um usuário
  deleteUser: (id) => db(tableName).where('id', id).del()
};

module.exports = UserModel;
