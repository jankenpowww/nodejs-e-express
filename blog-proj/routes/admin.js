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

    //Array de erros. Um erro ocorre quando os dados enviados não estarão de acordo com a validação.
    var erros = []

    //Validação de categoria. Valida se o nome enviado do formulário está incorreto. Se sim, 
    //o array de erros adiciona uma mensagem de erro referente à isto.

    //Validando se o nome foi informado ou se não está vazio.
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome de categoria inválido."})
    }

    //Validando se a categoria informada é muito pequena.
    if (req.body.nome.length < 2){
        erros.push({texto: "Nome de categoria muito curto."})
    }

    //Validando se o slug foi informado ou se não está vazio.
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug de categoria inválido."})
    }

    //Se qualquer erro existir na array de erros, ele retorna as mensagens de erro na view do formulário
    //Se não, ele é redirecionado para a view de categorias + cadastra a nova categoria.
    if (erros.length > 0)
    {
        res.render("admin/adicionar-categoria", {erro: erros}) //Retorna para a página de cadastro de categorias exibindo os erros.

    } else {        
        new Categoria({
            nome: req.body.nome,
            slug: req.body.slug
    
        }).save().then(() => {
            
            //Exibindo mensagem flash de sucesso.
            req.flash("success_msg", "Categoria adicionada com sucesso!")

            //Redirecionando para a rota principal.
            res.redirect("/admin/categorias")
    
        }).catch((err) => {
            req.flash("error_msg", "Houve um problema ao cadastrar a categoria. Tente novamente")
            res.send(`<h3>Não foi possível registrar!</h3><br><p>${err}</p>`)
        })
    }
})

module.exports = router //Exportamos o módulo para utilizar no arquivo de servidor principal.