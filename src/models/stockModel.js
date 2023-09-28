const knex = require('knex');
const knexConfig = require('../config/knexfile');

const db = knex(knexConfig);

const tableName = 'stock_items';

const StockModel = {
  // Buscar todos os itens
  getAllItems: () => db(tableName).select('*'),

  // Buscar um item por ID
  getItemById: (id) => db(tableName).where('id', id).first(),

  // Adicionar novo item
  addItem: (item) => db(tableName).insert(item),

  // Atualizar um item
  updateItem: (id, item) => db(tableName).where('id', id).update(item),

  // Deletar um item
  deleteItem: (id) => db(tableName).where('id', id).del()
};

module.exports = StockModel;
