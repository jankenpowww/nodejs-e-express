//Importando o módulo do express e inicializando.
var express = require("express")
var app = express()

//Definindo número de porta.
var port = 8080

//O módulo path, nativo do Node, provê ferramentas para trabalhar com arquivos e diretórios.
//Neste caso específico, vai ser utilziado para definir o caminho dos HTMLs enviados como resposta
//a alguma requisição da URL, ou quando o usuário acessar o site por links.
var path = require("path")

//A partir daqui, toda a lógica de requisição e resposta do servidor, referente ao usuário
//acessar páginas e o servidor devolver uma página HTML como resposta.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/html/index.html"))
})

app.get("/sobre", (req, res) => {
    res.sendFile(path.join(__dirname, "/html/sobre.html"))
})

app.get("/nao-clique-neste-link", (req, res) => {
    res.sendFile(path.join(__dirname, "/html/nao-clique.html"))
})

//Rodando o servidor a partir do momento em que damos 'node server' no terminal.
//Daqui, é só entrar no endereço + a url onde especificamos uma resposta do servidor
//assim que acessarmos.
app.listen(port, "localhost", () => {
    console.log(`O servidor está disponível em localhost:${port}/\nCTRL + C para encerrar.`)
})