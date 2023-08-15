//Conexão com o banco de dados.

const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize("bd_projeto", "root", "mysqlpassword", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true
    }
})

const Usuario = db.define("Usuario", {
    nome: {
        type: DataTypes.STRING
    },

    sobrenome: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    idade: {
        type: DataTypes.INTEGER
    }
})

const Postagem = db.define("Postagem", {
    titulo: {
        type: DataTypes.STRING
    },

    descricao: {
        type: DataTypes.TEXT
    }
})

db.authenticate().then(() => {
    console.log("A conexão foi bem sucedida!")

}).catch((erro) => {
    console.log("Houve um erro de conexão.\n" + erro)

})

Usuario.sync({force: false})
Postagem.sync({force: false})

module.exports = db