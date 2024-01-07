const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const usuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } //Determina se o usuário é administrador ou não.
})

const Usuario = mongoose.model("usuarios", usuarioSchema)

module.exports = Usuario