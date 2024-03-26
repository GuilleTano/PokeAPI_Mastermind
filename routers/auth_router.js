import express from "express";
import { authController } from "../controllers/auth_controller.js";
const authRoutes = express.Router();

authRoutes.route("/")
    .get((req, res) => {
        res.send("Auth router");
    })
    .post((req, res) => {
        res.send("Auth router");
    })


authRoutes.route("/login").post(authController.auth);


export { authRoutes };