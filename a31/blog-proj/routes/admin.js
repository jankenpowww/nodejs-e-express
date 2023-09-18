//Criando grupo de rotas associadas ao usuário administrador da aplicação
const express = require("express")
const router = express.Router() //Vai permitir grupos de rotas associados. Precisamos associar à uma variável.

router.get("/", (req, res) => {
    res.send("<h3>Página principal do painel de administrador.<h3>")
})

router.get("/posts", (req, res) => {
    res.send("<h3>Página de posts.</h3>")
})

router.get("/categorias", (req, res) => {
    res.send("<h3>Página de categorias.</h3>")
})

module.exports = router //Exportamos o módulo para utilizar no arquivo de servidor pirncipal.