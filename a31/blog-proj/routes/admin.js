//Criando grupo de rotas associadas ao usuário administrador da aplicação
const express = require("express")
const router = express.Router() //Vai permitir grupos de rotas associados. Precisamos associar à uma variável.

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/posts", (req, res) => {
    res.render("admin/posts")
})

router.get("/categorias", (req, res) => {
    res.send("<h3>Página de categorias.</h3>")
})

module.exports = router //Exportamos o módulo para utilizar no arquivo de servidor pirncipal.