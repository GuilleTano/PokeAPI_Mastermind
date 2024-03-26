import { v4 as uuidv4 } from 'uuid';
import { myCrypt } from "../crypto.js";
import { teamController } from './team_controller.js';
const userController = {};
const userDB = {};

// Registro de usuarios
userController.registerUser = async (user, pass) => {
    try {
        //console.log("llamando registerUser");
        const hashedPassword = await myCrypt.hashPassword(pass);
        const userId = uuidv4();
        userDB[userId] = {
            userName: user,
            password: hashedPassword
        };
        teamController.bootstrapTeam(userId); // Crea en la DB de team un equipo vacio para el usuario
        console.log("fin de registerUser, el usaurio es: " + userDB[userId].userName);
        return userId;
    } catch (error) {
        throw error;
    }
};

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
        throw error;
    }
};

export { userController };
