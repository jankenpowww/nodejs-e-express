const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const categoriaSchema = new Schema({
    nome: {type: String, required: true},
    slug: {type: String, required: true},
    date: {type: Date, default: Date.now()}
})

const Categoria = mongoose.model("categoria", categoriaSchema)

module.exports = Categoria