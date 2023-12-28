const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const postagemSchema = new Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    conteudo: {type: String, required: true},
    slug: {type: String, required: true},
    data: {type: Date, default: Date.now()},

    categoria: {
        type: Schema.Types.ObjectId, //O valor de categoria será associada/relacionada ao id de um outro documento.
        ref: "categoria", //O objeto 'ref' define o nome da coleção de referência no banco de dados à ser relacionada.
        required: true
    } 
})

const Postagem = mongoose.model("postagens", postagemSchema)

module.exports = Postagem