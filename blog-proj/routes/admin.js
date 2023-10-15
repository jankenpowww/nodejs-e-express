//Criando grupo de rotas associadas ao usuário administrador da aplicação
const express = require("express")
const router = express.Router() //Vai permitir grupos de rotas associados. Precisamos associar à uma variável.

//Importando model associada ao administrador.
const Categoria = require("../models/Categoria")

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/posts", (req, res) => {
    res.render("admin/posts")
})

router.get("/categorias", (req, res) => {
    res.render("admin/categorias")
})

//Acesso ao formukário de categorias.
router.get("/categorias/adicionar", (req, res) => {
    res.render("admin/adicionar-categoria")
})

//Processamento dos dados enviados do fomulário de categorias
router.post("/categorias/adicionar", (req, res) => {
    const nome = req.body.nome
    const slug = req.body.slug

    new Categoria({
        nome: nome,
        slug: slug

    }).save().then(() => {
        res.send("<h3>Categoria registrada com sucesso!</h3>")

    }).catch((err) => {
        res.send(`<h3>Não foi possível registrar!</h3><br><p>${err}</p>`)
    })
})

module.exports = router //Exportamos o módulo para utilizar no arquivo de servidor pirncipal.