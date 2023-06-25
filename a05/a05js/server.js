//Criando um servidor para uma aplicação web com três rotas: 'home', 'contato' e 'noticias'.

//Arquivo fonte do servidor. É aqui que o servidor aberto irá rodar e onde estará a lógica das resposta das requisições.

//Requerindo o módulo 'http'.
var http = require("http")

//Criando o servidor e a lógica de todas as requisições e suas respostas.
//req - lida com as requisições do usuário.
//res - lida com a resposta do usuário mediante a requisição.
var server = http.createServer((req, res) => {

    //req.url retorna uma string da rota atual acessada pelo usuário.
    console.log(`Url atual: ${req.url}`)

    switch (req.url){
        case "/":
        case "/home":
            res.end("<h1>Voce esta na home do site!</h1>")
        break

        case "/contato":
            res.end("<h1>Voce esta na parte de contato do site!</h1>")
        break

        case "/noticias":
            res.end("<h1>Voce esta na parte de noticias do site!</h1>")
        break

        default:
            res.end("<h1 style='color: red'>Erro!</h1><p>Essa pagina nao existe.</p>")
    }
})


//Rodando o servidor em seguida, passando numero da porta e o provedor (localhost)
server.listen(5001, "localhost", () => {
    console.log("Servidor rodando na porta 5001!")
    console.log("CTRL + C para encerrar servidor.")
})