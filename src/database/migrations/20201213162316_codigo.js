exports.up = function (knex) {
  return knex.schema
    .createTable("codigo", function (table) {
      table.increments("id").primary();
      table.string("hash").notNullable();
      table.boolean("usado").notNullable();
      table.integer("pontos").notNullable();

      table.integer("id_empresa").notNullable();
      table.foreign("id_empresa").references("id").inTable("empresa");
    })
    .then(() => {
      console.log("tabela codigo criada");
    });
};

exports.down = function (knex) {};
