const connection = require("../database/connection");

module.exports = {
  async criarEmpresa(req, res) {
    const empresa = {
      nome: "Ricardo Eletro",
      login: "125",
      senha: "123",
    };

    const response = await connection("empresa").insert(empresa);

    return res.status(200);
  },
  async listar(req, res) {
    const empresas = await connection("empresa").select("*");
    return res.json(empresas);
  },
  async delete(req, res) {
    const response = await connection("empresa").where("id", req.body.id).del();
    return res.json(`Empresa de ID ${req.body.id} deletada.`);
  },
};
