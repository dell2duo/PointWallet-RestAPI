const routes = require("express").Router();
const connection = require("./database/connection");
const crypto = require("crypto");

routes.get("/listarCodigos", async (req, res) => {
  const codigos = await connection("codigo").select("*");
  return res.json(codigos);
});

routes.get("/listarCreditos", async (req, res) => {
  const creditos = await connection("credito").select("*");
  return res.json(creditos);
});

routes.get("/listarClientes", async (req, res) => {
  const clientes = await connection("cliente").select("*");
  return res.json(clientes);
});

routes.get("/listarEmpresas", async (req, res) => {
  const empresas = await connection("empresa").select("*");
  return res.json(empresas);
});

routes.get("/cadastrarCliente", async (req, res) => {
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
});

routes.get("/cadastrarEmpresa", async (req, res) => {
  const empresa = {
    nome: "Ricardinho Martelinho de Ouro",
    login: "123",
    senha: "123",
  };

  const response = await connection("empresa").insert(empresa);

  return res.status(200);
});

routes.post("/loginCliente", async (req, res) => {
  const { cpf, senha } = req.body;

  const response = await connection("cliente").select("*").where("cpf", cpf);
  if (!response) {
    res.json("Cliente inexistente.").status(404);
  }

  if (response.senha !== senha) {
    res.json("Senha incorreta.").status(400);
  }

  return res.json(response);
});

routes.post("/loginEmpresa", async (req, res) => {
  const { login, senha } = req.body;

  const response = await connection("empresa")
    .select("*")
    .where("login", login);
  if (!response) {
    res.json("Empresa inexistente.").status(404);
  }

  if (response.senha !== senha) {
    res.json("Senha incorreta.").status(400);
  }

  return res.json(response);
});

routes.post("/gerarCodigo", async (req, res) => {
  const hex = crypto.randomBytes(20).toString("hex").substring(0, 6);

  const codigo = {
    id_empresa: req.body.id_empresa,
    hash: hex,
    usado: false,
    pontos: req.body.pontos,
  };

  const response = await connection("codigo").insert(codigo);

  return res.json(codigo);
});

routes.post("/resgatarCodigo", async (req, res) => {
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
      await connection("credito").where("id_cliente", req.body.id).insert(obj);
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
});

module.exports = routes;
