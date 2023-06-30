var app = require("express")()

app.get("/", (req, res) => {
    res.send("<h1>Testando o Nodemon.</h1><p>gfdsgdfg</p>")
})

app.listen(5050)