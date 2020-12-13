exports.up = function (knex) {
  return knex.schema
    .createTable("credito", function (table) {
      table.increments("id").primary();
      table.integer("id_empresa").notNullable();
      table.integer("id_cliente").notNullable();
      table.integer("pontos").notNullable();

      table.foreign("id_empresa").references("id").inTable("empresa");
      table.foreign("id_cliente").references("id").inTable("cliente");
    })
    .then(() => {
      console.log("tabela credito criada");
    });
};

exports.down = function (knex) {};
