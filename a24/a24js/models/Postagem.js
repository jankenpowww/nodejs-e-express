//Arquivo para o Model de postagem.

const { DataTypes } = require("sequelize")
const db = require("./db")

const Postagem = db.define("Postagem", {
    titulo: {
        type: DataTypes.STRING
    },

    descricao: {
        type: DataTypes.TEXT
    }
})

module.exports = Postagem