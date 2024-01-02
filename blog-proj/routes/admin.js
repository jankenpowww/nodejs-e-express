//Criando grupo de rotas associadas ao usuário administrador da aplicação
const express = require("express")
const router = express.Router() //Vai permitir grupos de rotas associados. Precisamos associar à uma variável.

//Importando models associada ao administrador.
const Categoria = require("../models/Categoria")
const Postagem = require("../models/Postagem")

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/categorias", (req, res) => {

    //A renderização ocorre após a coleta de todos os objetos do banco (que nem no sequelize)
    Categoria.find().then((categorias) => {
        res.render("admin/categorias", {categoria: categorias}) //Passando objeto com os valores.

    }).catch((err) => {
        re.flash("error_msg", "Houve um erro inesperado ao recuperar as categorias salvas.")
        res.redirect("/admin")
    })
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

//Rota de edição de categorias.
//Recebe a id do documento associado através do recurso de route parameter.
//A id associada renderiza uma página de formulário para a edição do documento.
router.get("/categorias/editar/:id", (req, res) => {
    
    //Retorna o documento associado à id, e renderiza a view do form de edição da categoria associada.
    Categoria.findById(req.params.id).then((categoria) => {
        res.render("admin/editar-categoria", categoria)
    })

})

//Rota de processamento de informações de edição de categoria.
//A rota GET do formulário de categorias envia as informações via post para esta rota.
//O valor do input do tipo hidden que contém a id é utilizada para identificar 
//o documento e acessar as informações editadas.
router.post("/categorias/editar", (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        //Atribuindo o novo valor ao documento recuperado associado à id.
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        //Salvando as informações de categoria. Se as informações foram editadas com sucesso ou não,
        //o usuário é redirecionado para a página principal que exibirá uma mensagem flash.
        categoria.save().then(() => {

            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")

        }).catch(() => {
            req.flash("error_msg", "Houve um erro ao editar as informações. Por favor, tente novamente.")
            res.redirect("/admin/categorias")
        })

    })
})

//Rota de exclusão de categorias: ao clicar no botão 'Deletar Categoria', o usuário é redirecionado
//para esta rota, que redireciona para a página de categorias novamente exibindo uma mensagem flash de sucesso ou erro.
router.post("/categorias/deletar", (req, res) => {

    //Deletando a categoria.
    Categoria.findByIdAndDelete(req.body.id).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")

    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria. Por favor, tente novamente.")
        res.redirect("/admin/categorias")
    })
})

/**/

router.get("/postagens", (req, res) => {

    Postagem.find()
    .populate("categoria", "nome")
    .sort({data: "desc"})
    .then((postagens) => {
        res.render("admin/postagens", {postagem: postagens})

    }).catch((err) => {
        req.flash("error_msg", "Erro ao carregar postagens.")
        res.redirect("/admin/postagens")

    })

})

router.get("/postagens/adicionar", (req, res) => {

    //Carregando todas as categorias para o <select> de categorias do form
    Categoria.find().then((categorias) => {
        res.render("admin/adicionar-postagem", {categoria: categorias})

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar alguns recursos.")
        res.redirect("/admin/postagens")
    })

})

router.post("/postagens/adicionar", (req, res) => {
    let erros = []

    const titulo = req.body.titulo,
          slug = req.body.slug,
          descricao = req.body.descricao,
          conteudo = req.body.conteudo,
          categoria = req.body.categoria

    if (categoria != "0") {
        new Postagem({
            titulo: titulo,
            slug: slug,
            descricao: descricao,
            conteudo: conteudo,
            categoria: categoria

        }).save().then(() => {
            req.flash("success_msg", "Postagem adicionada com sucesso!")
            res.redirect("/admin/postagens")

        }).catch((err) => {
            req.flash("error_msg", "Erro ao cadastrar a postagem. Tente novamente.")
            res.redirect("/admin/postagens")
            
        })

    } else {
        erros.push({texto: "Nenhuma categoria registrada. Por favor, adicione uma nova categoria e prossiga criando uma nova postagem."})
        res.render("admin/adicionar-postagem", {erro: erros})
    }
})

router.get("/postagens/editar/:id", (req, res) => {

    Postagem.findById(req.params.id).then((postagem) => {

        Categoria.find().then((categorias) => {
            res.render("admin/editar-postagem", {postagem: postagem, categoria: categorias})

        }).catch(() => {
            req.flash("error_msg", "Houve um erro ao carregar recursos de categorias. Tente novamente.")
            res.redirect("/admin/postagens")
        })
        
    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao carregar recursos de postagens. Tente novamente.")
        res.redirect("/admin/postagens")

    })
})

router.post("/postagens/editar", (req, res) => {
    Postagem.findById(req.body.id).then((postagem) => {

        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.categoria = req.body.categoria
        postagem.conteudo = req.body.conteudo

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("/admin/postagens")

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar as alterações. Tente novamente.")
            res.redirect("/admin/postagens")

        })

    }).catch((err) => {
        console.log(err)
        req.flash("error_msg", "Houve um erro ao salvar as alterações. Tente novamente.")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagens/deletar", (req, res) => {
    Postagem.findByIdAndDelete(req.body.id).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect("/admin/postagens")

    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao deletar a postagem. Tente novamente.")
        res.redirect("/admin/postagens")

    })
})

module.exports = router //Exportamos o módulo para utilizar no arquivo de servidor principal.