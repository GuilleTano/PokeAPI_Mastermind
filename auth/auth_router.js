import express from "express";
import { authHttpHandler } from "./auth_http.js";
const authRoutes = express.Router();

authRoutes.route("/login").post(authHttpHandler.loginUser);

export { authRoutes };