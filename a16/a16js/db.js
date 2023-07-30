const { Sequelize } = require("sequelize")

const conexao = new Sequelize("banco_teste", "root", "***********", {
    host: "localhost",
    dialect: "mysql"
})

conexao.authenticate().then(() => {
    console.log("[Sucesso] Banco de dados conectado com sucesso!")
}).catch((err) => {
    console.log("[Erro] Não foi possível se conectar: " + err)
})