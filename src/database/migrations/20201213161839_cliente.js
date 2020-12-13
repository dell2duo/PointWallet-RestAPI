exports.up = function (knex) {
  return knex.schema
    .createTable("cliente", function (table) {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("cpf").notNullable();
      table.string("senha").notNullable();
    })
    .then(() => {
      console.log("tabela cliente criada");
    });
};

exports.down = function (knex) {};
