exports.up = function(knex) {
  return knex.schema
    .createTable('departments', function(table) {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('checklist_groups', function(table) {
      table.increments('id').primary();
      table.string('name');
    })
    .table('users', function(table) {
      table.integer('department_id').unsigned().references('id').inTable('departments');
    })
    .createTable('checklist', function(table) {
      table.increments('id').primary();
      table.string('item');
      table.boolean('checked').defaultTo(false);
      table.integer('group_id').unsigned().references('id').inTable('checklist_groups');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('checklist')
    .dropTable('checklist_groups')
    .table('users', function(table) {
      table.dropColumn('department_id');
    })
    .dropTable('departments');
};
