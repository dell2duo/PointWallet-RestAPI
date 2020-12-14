const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async listar(req, res) {
    const codigos = await connection("codigo").select("*");
    return res.json(codigos);
  },
  async gerar(req, res) {
    const hex = crypto.randomBytes(20).toString("hex").substring(0, 6);

    const codigo = {
      id_empresa: req.body.id_empresa,
      hash: hex,
      usado: false,
      pontos: req.body.pontos,
    };

    const response = await connection("codigo").insert(codigo);

    return res.json(codigo);
  },
  async resgatar(req, res) {
    // const hex = crypto.randomBytes(20).toString("hex").substring(0, 6);
    const { hash } = req.body;

    let response = await connection("codigo").select("*").where("hash", hash);
    // console.log(response);
    if (!response.length) {
      return res.json("Código inexistente.");
    }
    response = response[0];

    if (!response.usado) {
      let credito_cliente = await connection("credito")
        .select("*")
        .where("id_cliente", req.body.id)
        .where("id_empresa", response.id_empresa);
      credito_cliente = credito_cliente[0];
      if (!credito_cliente) {
        const obj = {
          id_empresa: response.id_empresa,
          id_cliente: req.body.id,
          pontos: response.pontos,
        };
        await connection("credito")
          .where("id_cliente", req.body.id)
          .insert(obj);
        await connection("codigo").where("hash", hash).update({ usado: true });

        return res.json(`${obj.pontos} pontos cadastrados com sucesso!`);
      }

      const pontos = credito_cliente.pontos + response.pontos;
      await connection("credito")
        .where("id_cliente", req.body.id)
        .where("id_empresa", response.id_empresa)
        .update({ pontos: pontos });
      await connection("codigo").where("hash", hash).update({ usado: true });

      return res.json(`${pontos} pontos cadastrados com sucesso!`);
    }
    return res.json("Código já resgatado.");
  },
};
