exports.up = function(knex) {
  return knex.schema
    .createTable('checklist_completion', function(table) {
      table.increments('id').primary();
      table.integer('checklist_id').unsigned().references('id').inTable('checklist');
      table.timestamp('completed_at').defaultTo(knex.fn.now());
      table.string('reporter');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('checklist_completion');
};
