require('dotenv/config');
const userService = require("../models/userService");

const dbSelected = process.env.DB || 'MongoDb';
const service = new userService(dbSelected);

const getUser = (req, res) => {
    if(!req.params.id){
        res.status(400).send({ status: "Bad Request", data: {error: "Id no recibido"} });
    }
    const getUserByID = service.getUserById(req.params.id);
    getUserByID
    .then( (response) => {
        if(response.username){
            res.status(200).send({ status: "OK", data: response })
        }else{
            res.status(400).send({ status: "FAILED", data: {error: "El Usuario no existe"} });
        }
    })
};

module.exports = {getUser};