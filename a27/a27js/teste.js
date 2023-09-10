const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:24018/bdteste").then(() => {
    console.log("Conectado com sucesso!")

}).catch((err) => {
    console.log("Erro ao se conectar:\n" + err)

})