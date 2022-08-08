require('dotenv/config');

const firebaseConfig = {
    jsonKey: process.env.JSON_KEY_FIREBASE,
    database: process.env.FIREBASE_DB,
}

const mongoDbConfig = {
    connectString: process.env.MONGO_STRING,
}


module.exports = {
    firebaseConfig,
    mongoDbConfig,
};