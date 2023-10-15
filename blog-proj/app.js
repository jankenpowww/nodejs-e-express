//Importação de módulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const path = require("path")
    const mongoose = require("mongoose")

//Inicialização do Express e suas configurações + Handlebars
    const app = express()

    //Bodyparser e Json.
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    //Acesso à arquivos estáticos (CSS e JavaScript)
    app.use(express.static(path.join(__dirname, "public")))

    //Handlebars
    app.engine("handlebars", handlebars.engine({
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
    }))

    app.set("view engine", "handlebars")

//Mongoose
    mongoose.connect("mongodb://127.0.0.1:27017/blogApp").then(() => {
        console.log("MongoDB conectado!")

    }).catch((err) => {
        console.log("Erro ao se conectar com o MongoDB.\n" + err)
    })

//Importação de rotas
    const admin = require("./routes/admin") //Importando grupo de rotas relacionado ao administrador.

//Lógica de servidor
    app.use("/admin", admin) //Definindo um caminho e passando o grupo de rotas do administrador como relação.

//Rodando servidor
    const HOST = "localhost"
    const PORT = 3030
    
    app.listen(PORT, HOST, () => {
        console.log(`Aberto em '${HOST}:${PORT}'. Ctrl+C para encerrar.`)
    })