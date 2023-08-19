//Importando bancos de dados e models.
const db = require("./models/db")
const Postagem = require("./models/Postagem")

//Importando express, template engine.
const express = require("express")
const handlebars = require("express-handlebars")

//Lógica de servidor
const app = express()

app.engine("handlebars", handlebars.engine({defaultLayout: "main"})) //Configuração do Handlebars
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send()
})

//Definindo e renderizando HTML da rota de cadastro de postagem.
app.get("/cadastrar-postagem", (req, res) => {
    res.render("cadastro-de-postagem")  //Não é necessário incluir a extensão aqui.
})

//Definindo para onde os dados enviados do formulário devem ser processados.
app.post("/postagem-adicionada", (req, res) => {
    let tituloPost = req.body.tituloPost ?? "[Não informado]"
    let descricaoPost = req.body.descricaoPost ?? "[Não informado]"

    //Inserindo a nova postagem no banco de dados
    //provendo dentro de uma estrutura then/catch
    Postagem.create({
        titulo: tituloPost,
        descricao: descricaoPost
    }).then(() => {
        res.send(`<h3>Postagem cadastrada com sucesso!</h3>
              <h4>Título: ${tituloPost}</h4>
              <h4>Descrição: ${descricaoPost}</h4>`)

    }).catch((erro) => {
        res.send(`Não foi possível realizar a postagem =( \n\n ${erro}`)
    })

    
})

db.sync({force: false}) //Sincronizando todas as tabelas com o banco de dados.

app.listen(5859, "localhost", () => {
    console.log("Servidor rodando em 'localhost:5859/'. Ctrl+C para encerrar.")
})