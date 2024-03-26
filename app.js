import express from "express";
import bodyParser from "body-parser";
// Routes
import { authRoutes } from "./routers/auth_router.js";
import { teamRoutes } from "./routers/team_router.js";

const app = express();
app.use(bodyParser.json());
const port = 3000;

// ENDPOINTS:
// Raiz 
app.get("/", (req, res)=>{
    res.status(200).send("Hello World!");
});
// Login
app.use("/auth", authRoutes);
// Consulta de equipo y otros
app.use("/team", teamRoutes);

app.listen(port, ()=>{
    console.log("Servidor iniciado en el puerto 3000")
});

export { app };