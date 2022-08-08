const dao = require("./Database");
const daosDbs = require('./dao/daosDbs');
const dtoUser = require('./dto/User');

class userService extends daosDbs{
    constructor(dbSelected){
        super();
        if(this.isDbType(dbSelected)){
            this.dao = new dao(dbSelected);
        }else{
            throw new Error("Db no soportada");
        }
        
    }
    async getUserById(id){
        const usuario = await this.dao.db.getById(id);
        if(usuario !== null){
            const user = new dtoUser(usuario);
            return (user !== undefined)?user.getData():false;   
        }else{
            return false;
        }             
    }
}

module.exports = userService;

