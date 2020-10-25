exports.up = (knex) => (
  knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('state');
    table.string('title');
    table.text('text');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.integer('author_id').unsigned();
    table.foreign('author_id').references('id').inTable('users');
  })
);

exports.down = (knex) => knex.schema.dropTable('posts');
