const db = require("./db")

const express = require("express")
const handlebars = require("express-handlebars")

//Lógica de servidor
const app = express()

//Configuração do Handlebars
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("<h1>Seja bem vindo!</h1>")
})

//Definindo e renderizando HTML da rota de cadastro de postagem.
app.get("/cadastrar-postagem", (req, res) => {
    res.render("cadastro-de-postagem")  //Não é necessário incluir a extensão aqui.
})

//Definindo para onde os dados enviados do formulário devem ser processados.
app.post("/postagem-adicionada", (req, res) => {
    let tituloPost = req.body.tituloPost ?? "[Não informado]"
    let descricaoPost = req.body.descricaoPost ?? "[Não informado]"

    //inserindo a nova postagem no banco de dados.
    db.model("Postagem").create({
        titulo: tituloPost,
        descricao: descricaoPost
    })

    res.send(`<h3>Postagem cadastrada com sucesso!</h3>
              <h4>Título: ${tituloPost}</h4>
              <h4>Descrição: ${descricaoPost}</h4>`)
})

app.listen(5859, "localhost", () => {
    console.log("Servidor rodando em 'localhost:5859/'. Ctrl+C para encerrar.")
})