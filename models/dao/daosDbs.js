require('dotenv/config');

class daosDbs {
    constructor(){
        this.dbTypes = ['MongoDb', 'Firebase'];
    }

    isDbType(name){
        return this.dbTypes.includes(name);
    }
}

module.exports = daosDbs;