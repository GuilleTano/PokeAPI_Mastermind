import jwt from "jsonwebtoken";
import { userController } from "./user_controller.js";

// Registro de usuario *Temporal para pruebas*
await userController.registerUser("bettatech", "1234");
await userController.registerUser("mastermind", "1235");

const authController = {};

authController.auth = async (req, res) => {
    try {
        // Comprobamos que recibimos datos en el body de la request
        if(!req.body) return res.status(400).json({message: "Missing data"});
        if(!req.body.userName || !req.body.password) return res.status(400).json({message: "Missing data"});
        
        // Comprobamos credenciales
        const { userName, password } = req.body;
        const validCredentials = await userController.checkUserCredentials(userName, password);

        // Si no son válidas, error
        if (!validCredentials) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let user = userController.getUserIdFromUserName(req.body.userName);
        //console.log("user de auth_controller:")
        //console.log(user)
        const payload = {
            userId: user.userId,
            userName: user.userName
        };
        const token = jwt.sign(payload, "secretKey");
        res.status(200).json({ token: token });
    } catch (error) {
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { authController };