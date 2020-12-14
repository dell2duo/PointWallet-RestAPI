const connection = require("../database/connection");

module.exports = {
  async listar(req, res) {
    const creditos = await connection("credito").select("*");
    return res.json(creditos);
  },
  async delete(req, res) {
    const response = await connection("credito")
      .where("id_empresa", req.body.id)
      .del();
    return res.json(`Empresa de ID ${req.body.id_empresa} deletada.`);
  },
};
