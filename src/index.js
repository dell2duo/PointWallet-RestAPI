const express = require("express"); //servidor node
const routes = require("./Routes"); //arquivo de rotas
const cors = require("cors");

const app = express(); //cria o servidor

app.use(express.json()); //indica o uso do padrão JSON para requisições
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes, () => {
  console.log("middleware");
}); //uso do arquivo routes para rotas

app.listen(3333); //indica a porta 3333 para uso do express
