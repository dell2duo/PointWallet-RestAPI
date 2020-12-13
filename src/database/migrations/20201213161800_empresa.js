exports.up = function (knex) {
  return knex.schema
    .createTable("empresa", function (table) {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("login").notNullable();
      table.string("senha").notNullable();
    })
    .then(() => {
      console.log("tabela empresa criada");
    });
};

exports.down = function (knex) {};
