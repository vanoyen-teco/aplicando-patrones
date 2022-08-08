const { firebaseConfig } = require("./config");
const path = require('path');
const admin = require("firebase-admin");

const serviceAccount = require(path.join('../../../keys/' , firebaseConfig.jsonKey));

try {
    admin.app();
} catch  {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const query = db.collection('productos');

async function get(){
    const translations = [];
    const querySnapshot = await query.get();
    querySnapshot.forEach(doc => {
        translations.push(doc.data());
    });
    return translations;
}

async function getById(productId){
    const prodRef = query.doc(productId);
    const doc = async () => {
        const res = await prodRef.get();
        const docData = res.data();
        return docData;
    }
    return  doc().then(res => res);
}

async function add(newProduct){
    const ref = await query.doc();
    newProduct.id = ref.id;
    newProduct = {...newProduct};
    const data = await ref.set(newProduct).then(() => { return newProduct});
    return data;
}

async function update(productId, changes){
    try {
        const prodRef = query.doc(productId);
        changes.id = productId;
        const res = await prodRef.update(changes).then(() => { return changes});
        return res;
    } catch (error) {
        return false;
    }
    
}

async function remove(productId){
    const res = await query.doc(productId).delete();
    return res;
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};