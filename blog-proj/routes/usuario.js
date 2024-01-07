const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs") //Gera um hash de senhas cadastradas.

const Usuario = require('../models/Usuario')

router.get("/registro", (req, res) => {
    res.render("usuario/registro")
})

router.post("/registro", (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const senhaConfirm = req.body.senhaConfirm

    let erros = []

    //Verifica se a senha está vazia e em seguida se é diferente da senha confirmada.
    if (!senha) {
        erros.push({texto: "A senha não foi informada."})

    } else if (senha != senhaConfirm) {
        erros.push({texto: "A senha que você criou não confere. Tente novamente."})
    }

    //Verifica se não há erros. Se sim, o cadastro é feito.
    if (erros.length === 0) {

        //Verifica se o usuário em questão já existe no sistema.
        Usuario.findOne({email: email}).then((usuario) => {

            //Verificamos se o usuário NÃO EXISTE no banco de dados para realizar o cadastro.
            if (!usuario) {

                const novoUsuario = new Usuario({
                    nome: nome,
                    email: email,
                    senha: senha
                })

                //Cria o hash da senha e salva o usuário no banco de dados.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                        if (err) {
                            req.flash("error_msg", "Houve um erro ao gerar hashes de usuário. Tente novamente.")
                            res.redirect("/usuario/registro")

                        } else {
                            novoUsuario.senha = hash

                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "Usuário criado com sucesso.")
                                res.redirect("/")

                            }).catch(() => {
                                req.flash("error_msg", "Erro ao criar o registro. Por favor tente novamente.")
                                res.redirect("/usuario/registro")

                            })

                        }
                    })
                })

            } else {
                req.flash("error_msg", "O e-mail informado já pertence a uma conta existente.")
                res.redirect("/usuario/registro")
            }

        })

    } else {
        res.render("usuario/registro", {erro: erros})
    }
})

module.exports = router