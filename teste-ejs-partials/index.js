const express = require("express")
const ejs = require("ejs")
const app = express()

app.set("view engine", "ejs")

const posts = [
    {titulo: "Titulo 1", legenda: "Legenda 1"},
    {titulo: "Titulo 2", legenda: "Legenda 2"},
    {titulo: "Titulo 3", legenda: "Legenda 3"},
    {titulo: "Titulo 4", legenda: "Legenda 4"},
    {titulo: "Titulo 5", legenda: "Legenda 5"}
]

app.get("/", (req, res) => {
    res.render("pages/index", {posts: posts})
})

app.get("/sobre", (req, res) => {
    res.render("pages/sobre")
})

app.listen(8586, "localhost", () => {
    console.log("localhost:8586/")
})