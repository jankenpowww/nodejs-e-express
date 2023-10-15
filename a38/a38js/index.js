const app = require("express")()

//Definindo um Middleware. Middlewares executam uma função antes que a resposta de uma requisição é feita.
//Ao acessar qualquer rota, a mensagem do Middleware será executada primeiro, e em seguida, a mensagem de uma rota
//ou qualquer outra coisa dentro do bloco de código da rota é executada em seguida.

//next() deve ser chamado no fim de todo Middleware para executar finalmente o bloco de código de uma rota.
app.use((req, res, next) => {
    console.log("Sou um Middleware, e Middlewares são executados primeiro.")
    next()
})

app.use((req, res, next) => {
    console.log("Sou outro Middleware, estou sendo executado depois de outro Middleware!")
    next()
})

app.get("/", (req, res) => {
    console.log("Você acessou a página principal!")
    res.send("<h1>Teste Middleware! ^^</h1>")
})

app.listen(42159, "localhost", () => {
    console.log("Servidor aberto em 'localhost:42159/'. Ctrl+C 2 kill.")
})