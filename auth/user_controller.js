import { v4 as uuidv4 } from 'uuid';
import { myCrypt } from "../tools/crypto.js";
import { teamController } from '../team/team_controller.js';
import mongoose from "mongoose";
const UserModel = mongoose.model("UserModel", {userName: String, password: String, userId: String});
const userController = {};

userController.cleanUpUsers = async () => {
    try {
        await UserModel.deleteMany({});
        return
    } catch (err){
        throw new Error(err);
    }
}

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
        await teamController.bootstrapTeam(userId);
        return userId;
    } catch (error) {
        throw new Error("Error al registrar usurio: " + error);
    }
};

userController.getUser = async (userId) =>{
    try{
        const user = await UserModel.findOne({userId: userId})
        return user;
    } catch (err) {
        throw new Error("Error al obtener usuario en DB: " + err);
    }
}

userController.getUserFromUserName = async (userName) =>{
    try{
        const user = await UserModel.findOne({userName: userName})
        return user;
    } catch (err) {
        throw new Error("Error al obtener usuario en DB: " + err);
    }
}

userController.checkUserCredentials = async (userName, pass) => {
    try {
        let user = await userController.getUserFromUserName(userName);
        if (!user) {
            return false;
        }
        const passwordMatch = await myCrypt.comparePassword(pass, user.password);
        return passwordMatch;
    } catch (error) {
        throw new Error("Error al checkear credenciales: " + error);
    }
};

export { userController };