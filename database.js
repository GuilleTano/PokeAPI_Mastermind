import mongoose from 'mongoose';

const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_NAME = process.env.MONGODB_NAME;
const MONGODB_TEST = process.env.MONGODB_TEST;
const uri = `mongodb+srv://guillermotano:${MONGODB_PASS}@pokeapicluster.87azprp.mongodb.net/`;
let options = {};

if(process.env.NODE_ENV === "test"){
    options = {dbName: MONGODB_TEST};
} else {
    options = {dbName: MONGODB_NAME};
}

const connectionDB = ()=> mongoose.connect(uri, options);
mongoose.set('strictQuery', true);

export {connectionDB};