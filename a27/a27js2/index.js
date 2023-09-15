const mongoose = require("mongoose")
const { Schema } = require("mongoose")

mongoose.pluralize(null)

mongoose.connect("mongodb://127.0.0.1:27017/a27js2").then(() => {
    console.log("Conectado ao banco com sucesso.")

}).catch((err) => { 
    console.log("Ocorreu um erro ao se conectar.\n" + err)

})

const usuariosSchema = new Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: true },
    idade: { type: Number, require: true },
    email: { type: String, require: true },
    pais: { type: String, require: false, default: "Brasil" }
})

const Usuario = mongoose.model("Usuarios", usuariosSchema)

new Usuario({
    nome: "Júlia",
    sobrenome: "Monteiro",
    email: "julia@email.com",
    idade: 23

}).save().then(() => {
    console.log("Usuário criado com sucesso!")

}).catch((err) => {
    console.log("Não foi possível registrar o usuário!\n" + err)
})