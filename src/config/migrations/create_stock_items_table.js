exports.up = function (knex) {
  return knex.schema.createTable('stock_items', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('quantity').notNullable();
    table.float('price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('stock_items');
};
