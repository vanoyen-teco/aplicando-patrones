require('dotenv/config');
const express = require('express');
const bodyParser = require("body-parser");
const userRouter = require("../routes/userRoutes");

class Server{
    constructor() {
        this.PORT = process.env.PORT || 8080;
        this.app = express();
    }

    start(){
        this.app.use(bodyParser.json());
        this.app.use("/user", userRouter);
        this.app.use(function(req, res) {
            res.status(404).send({ status: "NOT FOUND", data: {error: -2, description: `Ruta ${req.path} metodo ${req.method} no implementado`}});
        });

        this.app.listen(this.PORT, () => {
            console.log('Servidor iniciado.', this.PORT);
        })
        this.app.on("error", error => console.log(`Error en servidor ${error}`));
    }
}

module.exports = Server;