const express = require("express")
const app = express()

//Setando ejs como template engine. Toda vez que renderizarmos views, o Express vai
//diretamente buscá-las no diretório 'views/' (e para esse diretório, esse deverá ser o nome exato)
app.set("view engine", "ejs")

//Criando um objeto com chave e valor. Esse objeto pode ser simplesmente os dados recuperados de um banco de dados.
const usuario = {
    nome: "Jorge",
    idade: 23,
    email: "jorge@gmail.com",
    admin: false
}

app.get("/", (req, res) => {
    res.render("pages/index", {usuario: usuario}) //A view 'index.js' será renderizada ao acessarmos a rota. Passamos
                                                  //o objeto acima para ser renderizado junto com o HTML.
})

//Criando um array de objetos de usuários. Passando dentro da renderização da view e utilizando-o para exibi-los em '/usuarios'.
const usuarios = [
    {nome: "Matheus", email: "matheus@gmail.com", admin: true},
    {nome: "Júlia", email: "julia@hotmail.com", admin: false},
    {nome: "Marcos", email: "marcos@gmail.com", admin: false},
    {nome: "Fernanda", email: "fernanda@outlook.com.br", admin: true},
    {nome: "Jorge", email: "jorge@gmail.com", admin: true}
]

app.get("/usuarios", (req, res) => {
    res.render("pages/usuarios", {usuarios: usuarios})
})

app.listen(8360, "localhost", () => {
    console.log("'localhost:8360/'")
})