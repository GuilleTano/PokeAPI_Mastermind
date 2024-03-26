import jwt from "jsonwebtoken";
import { checkUserCredentials, getUserIdFromUserName } from "./users_controller.js";

import { registerUser } from "./users_controller.js";
await registerUser("bettatech", "1234");

const authController = {};

authController.auth = async (req, res) => {
    try {
        // Comprobamos que recibimos datos en el body de la request
        if(!req.body) return res.status(400).json({message: "Missing data"});
        if(!req.body.userName || !req.body.password) return res.status(400).json({message: "Missing data"});

        // Comprobamos credenciales
        const { userName, password } = req.body;
        const validCredentials = await checkUserCredentials(userName, password);

        // Si no son válidas, error
        if (!validCredentials) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Si son válidas, generamos un JWT y lo devolvemos
        //const token = jwt.sign({ userID: userName }, "secretKey");

        let user = getUserIdFromUserName(req.body.userName);
        const token = jwt.sign({ userID: user.userId }, "secretKey");
        res.status(200).json({ token: token });
    } catch (error) {
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export {authController};