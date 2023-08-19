//Conexão com o banco de dados.
const { Sequelize } = require("sequelize")

const db = new Sequelize("bd_projeto", "root", "mysqlpassword", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true
    }
})

module.exports = db