const { Sequelize, DataTypes } = require("sequelize") //Import do construtor e outros componentes do Sequelize.

//Conexão com o banco de dados.
const db = new Sequelize("bd_teste", "root", "************", {
    host: "localhost",
    dialect: "mysql",

    //Define configurações do próprio banco de dados.
    define: {
        freezeTableName: true   //Define que os nomes das tabelas sejam criadas no singular.
    }
})

//Model para a tabela de postagens.
const Postagem = db.define("Postagem", {
    //Coluna/campo, tipo e especificações.
    titulo: {
        type: DataTypes.STRING
    },

    //Coluna/campo, tipo e especificações.
    descricao: {
        type: DataTypes.TEXT
    }
})

Postagem.create({
    titulo: "Primeira postagem!",
    descricao: "Essa é a primeira postagem registrada no banco de dados!"
})

//Model para a tabela de usuários.
const Usuario = db.define("Usuario", {
    nome: {
        type: DataTypes.STRING
    },

    sobrenome: {
        type: DataTypes.STRING
    },

    idade: {
        type: DataTypes.INTEGER
    },

    email: {
        type: DataTypes.STRING
    }
})

Postagem.sync({force: false})
Usuario.sync({force: false})