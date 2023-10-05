exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
    .then(() => {
      return knex('users').insert({
        name: 'Victor Gago',
        email: 'victor.gago.work@gmail.com',
        password: 'securepassword', // Nota: Na prática, você DEVE hash a senha antes de armazená-la!
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
