const connection = require("../database/connection");

module.exports = {
  async loginCliente(req, res) {
    const { cpf, senha } = req.body;

    const response = await connection("cliente").select("*").where("cpf", cpf);
    if (response.length === 0) {
      return res.json({ msg: "Cliente inexistente." }).status(404);
    }

    if (response[0].senha !== senha) {
      return res.json({ msg: "Senha incorreta." }).status(400);
    }

    return res.json(response[0]);
  },

  async loginEmpresa(req, res) {
    const { login, senha } = req.body;

    const response = await connection("empresa")
      .select("*")
      .where("login", login);
    if (response.length === 0) {
      return res.json("Empresa inexistente.").status(404);
    }

    if (response[0].senha !== senha) {
      return res.json("Senha incorreta.").status(400);
    }

    return res.json(response).status(200);
  },
};
