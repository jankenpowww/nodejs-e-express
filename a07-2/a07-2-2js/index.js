const express = require("express")
const app = express()

const path = require("path")

//Middlewares - aplicando urlencoded para capturar valores de corpo em qualquer rota acessada.
//Isso vai permitir capturar os dados passado em um form e utilizá-lo dentro de um post
app.use(express.urlencoded({extended: true}))

//Definindo o acesso ao localhost. O retorno vai ser um formulário de cadastro.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/html/cadastro.html"))
})

//Definindo o caminho para onde as informações do formulário anterior serão enviadas.
//A idéia é que, ao clicar em 'Cadastrar', o usuário seja redirecionado automaticamente para a rota em questão.
//Note que não é possível acessar /dados-cadastrais diretamente pela URL. A única maneira é
//cadastrando os dados na página de login.
app.post("/dados-cadastrais", (req, res) => {
    res.send(`<h3>Seus dados cadastrais</h3>
              <li>Nome: ${req.body.nomeUsuario}
              <li>Idade: ${req.body.idadeUsuario}`)
})

//Rodando a aplicação.
app.listen(6060, "localhost", () => {
    console.log("Acesse 'localhost:6060'. Ctrl+C para encerrar.")
})