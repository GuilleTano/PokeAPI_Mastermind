import { v4 as uuidv4 } from 'uuid';
import { myCrypt } from "../tools/crypto.js";
import { teamController } from '../team/team_controller.js';
import mongoose from "mongoose";
const userController = {};

let userDB = {};

// Modelo de mongoDB
const UserModel = mongoose.model("UserModel", {userName: String, password: String, userId: String});

// Registro de usuarios
userController.registerUser = async (user, pass) => {
    try {
        const hashedPassword = await myCrypt.hashPassword(pass);
        const userId = uuidv4();
        let newUser = new UserModel({
            userId: userId,
            userName: user,
            password: hashedPassword
        });
        await newUser.save();
        teamController.bootstrapTeam(userId); // Crea en la DB de team un equipo vacio para el usuario
        return userId;
    } catch (error) {
        throw new Error(error);
    }
};

// Limpiar la base de datos (solo usar en test)
userController.cleanUpUsers = () => {
    userDB = {};
}

userController.getUser = (userId) =>{
    return userDB[userId];
}

userController.getUserIdFromUserName = (userName) =>{
    for(let user in userDB){
        if(userDB[user].userName == userName) {
            let userData = userDB[user];
            userData.userId = user;
            return userDB[user];
        }
    }
}

// Comprobacion de usuarios
userController.checkUserCredentials = async (userName, pass) => {
    try {
        let user = userController.getUserIdFromUserName(userName);
        if (!user) {
            return false; // Usuario no encontrado
        }
        const passwordMatch = await myCrypt.comparePassword(pass, user.password);
        return passwordMatch;
    } catch (error) {
        throw new Error(error);
    }
};

export { userController };