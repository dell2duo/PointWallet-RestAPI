const routes = require("express").Router();

const authController = require("./controllers/authController");
const empresaController = require("./controllers/empresaController");
const clienteController = require("./controllers/clienteController");
const creditoController = require("./controllers/creditoController");
const codigoController = require("./controllers/codigoController");

routes.get("/listarCodigos", codigoController.listar);
routes.post("/gerarCodigo", codigoController.gerar);
routes.post("/resgatarCodigo", codigoController.resgatar);

routes.get("/listarCreditos", creditoController.listar);
routes.delete("/deleteCarteira", creditoController.delete);

routes.get("/listarClientes", clienteController.listar);
routes.get("/cadastrarCliente", clienteController.criarCliente);
routes.post("/empresasCliente", clienteController.empresas);

routes.get("/listarEmpresas", empresaController.listar);
routes.get("/cadastrarEmpresa", empresaController.criarEmpresa);
routes.delete("/deleteEmpresa", empresaController.delete);

routes.post("/loginCliente", authController.loginCliente);
routes.post("/loginEmpresa", authController.loginEmpresa);

module.exports = routes;
