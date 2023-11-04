const app = require("express")()

app.use((req, res, next) => {
    res.locals.nome = "Matheus"
    res.locals.email = "matheus@gmail.com"

    next()
})

app.get("/teste1", (req, res) => {
    res.send(res.locals.nome + "<br>" + res.locals.email + "<br>")
})

app.get("/teste2", (req, res) => {
    res.send(res.locals.nome + "<br>" + res.locals.email + "<br>")
})

app.listen(8004, "localhost", () => {
    console.log(">>> localhost:8004/teste1 <<<")
})