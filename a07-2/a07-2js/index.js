var app = require("express")()
var porta = 7272

app.get("/perfil", (req, res) => {
    let nome = req.query.nomeUsuario ?? "[Não Informado] - (informe passando nomeUsuario)"
    let idade = req.query.idadeUsuario ?? "[Não Informado] - (informe passando idadeUsuario)"
    let corFavorita = req.query.corFavorita ?? "[Não Informado] - (informe passando corFavorita)"

    res.send(`<h3>Suas informações de perfil:</h3>
              <li>Nome: ${nome}
              <li>Idade: ${idade}
              <li>Cor favorita: ${corFavorita}`)
})

app.post("/teste", (req, res) => {
    req.body
})

app.listen(porta, "localhost", () => {
    console.log(`Servidor em 'localhost:${porta}/perfil'. Ctrl+C para encerrar.`)
})