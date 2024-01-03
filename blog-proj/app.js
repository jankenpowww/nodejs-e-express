//Importação de módulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const path = require("path")

    const mongoose = require("mongoose")

    const session = require("express-session") //Utilizado para configurar sessões.
    const flash = require("connect-flash")

//Inicialização do Express e suas configurações + Handlebars
    const app = express()

    //Configuração da sessão
    app.use(session({
        secret: "idsessao",
        resave: true,
        saveUninitialized: true
    }))

    //Configuração do flash.
    app.use(flash())

    //Middleware de sessão
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg") //locals define variáveis de escopo global.
        res.locals.error_msg = req.flash("error_msg")
        
        next()
    })

    //Bodyparser e Json.
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    //Acesso à arquivos estáticos (CSS e JavaScript)
    app.use(express.static(path.join(__dirname, "public")))

    //Handlebars
    app.engine("handlebars", handlebars.engine({
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
    }))

    app.set("view engine", "handlebars")

//Mongoose
    mongoose.connect("mongodb://127.0.0.1:27017/blogApp").then(() => {
        console.log("MongoDB conectado!")

    }).catch((err) => {
        console.log("Erro ao se conectar com o MongoDB.\n" + err)
    })

//Models
    const Postagem = require("./models/Postagem")

//Importação de rotas
    const admin = require("./routes/admin") //Importando grupo de rotas relacionado ao administrador.

//Lógica de servidor
    app.get("/", (req, res) => { //Index
        Postagem.find().populate("categoria", "nome").sort({date: "desc"}).then((postagens) => {
            res.render("index", {postagem: postagens})
        })
    })

    app.get("/postagem/:slug", (req, res) => {

        Postagem.findOne({slug: req.params.slug}).populate("categoria", "nome").then((postagem) => {
            if (postagem) {
                res.render("postagem/postagem", {postagem: postagem})

            } else {
                req.flash("error_msg", "Houve um erro ao carregar o conteúdo. Talvez tenha sido excluído ou movido.")
                res.redirect("/")
            }

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno.")
            res.redirect("/")
        })
        
    })

    app.use("/admin", admin) //Definindo um caminho e passando o grupo de rotas do administrador como relação.

//Rodando servidor
    const HOST = "localhost"
    const PORT = 3030
    
    app.listen(PORT, HOST, () => {
        console.log(`Aberto em '${HOST}:${PORT}'. Ctrl+C para encerrar.`)
    })