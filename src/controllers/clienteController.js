const connection = require("../database/connection");

module.exports = {
  async criarCliente(req, res) {
    const clientes = [
      {
        cpf: "123",
        nome: "Petterson Kesler",
        senha: "123",
      },
      {
        cpf: "124",
        nome: "Rafael Rocha",
        senha: "123",
      },
      {
        cpf: "125",
        nome: "Matheus Henrique",
        senha: "123",
      },
      {
        cpf: "126",
        nome: "Aroldo",
        senha: "123",
      },
    ];
    clientes.forEach(async (cliente) => {
      const response = await connection("cliente").insert(cliente);
    });

    return res.status(200);
  },
  async listar(req, res) {
    const clientes = await connection("cliente").select("*");
    return res.json(clientes);
  },
  async empresas(req, res) {
    const { id_cliente } = req.body;

    const carteiras = await connection("credito")
      .where("id_cliente", id_cliente)
      .select("*")
      .join("empresa", "empresa.id", "=", "credito.id_empresa");

    let empresas = [];
    carteiras.forEach((carteira) => {
      empresas.push({
        nome: carteira.nome,
        pontos: carteira.pontos,
        id: carteira.id_empresa,
      });
    });
    return res.json(empresas).status(200);
  },
};
