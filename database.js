import mongoose from 'mongoose';

const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_NAME = process.env.MONGODB_NAME;
const uri = `mongodb+srv://guillermotano:${MONGODB_PASS}@pokeapicluster.87azprp.mongodb.net/`;
const options = {dbName: MONGODB_NAME};

const connectionDB = ()=> mongoose.connect(uri, options);

mongoose.set('strictQuery', true);

export {connectionDB};