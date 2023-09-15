//Importando módulos do mongoose separadamente
const mongoose = require("mongoose") //Importando mongoose.
const { Schema } = require("mongoose") //Importando 'Schema' do módulo principal para a criação de esquemas.

//Conexão da aplicação com o banco de dados.
mongoose.connect("mongodb://127.0.0.1:27017/bdteste").then(() => {
    console.log("Conectado com sucesso.")

}).catch((err) => {
    console.log("Erro ao se conectar.\n" + err)

})

//Definindo um esquema - atribuímos a classe Schema à uma variável e da qual utilizaremos para estruturar nosso Model
const UsuarioSchema = new Schema({
    nome: {type: String, require: true},
    sobrenome: {type: String, require: true},
    email: {type: String, require: true},
    idade: {type: Number, require: true},
    pais: {type: String, default: "Brasil"}
})

//Registrando e criando a model à uma collection de documentos do mesmo nome, com base no esquema criado.
const Usuario = mongoose.model("Usuario", UsuarioSchema)

//Criando um documento (registro) dentro da coleção de usuários.
new Usuario({
    nome: "Jorge",
    sobrenome: "Aragão",
    idade: 67,
    email: "jorge@email.com",
    pais: "Brasil",

}).save().then(() => {
    console.log("Usuário criado com sucesso!")

}).catch((err) => {
    console.log("Não foi possível registrar o usuário.\n" + err)

})