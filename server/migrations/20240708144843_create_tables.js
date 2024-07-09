exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('phone');
      })
      .createTable('alerts', function(table) {
        table.increments('id').primary();
        table.string('message');
        table.json('recipients');
      })
      .createTable('stats', function(table) {
        table.increments('id').primary();
        table.string('date');
        table.string('item');
        table.string('status');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('users')
      .dropTable('alerts')
      .dropTable('stats');
  };
  