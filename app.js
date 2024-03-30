import express from "express";
import { middlewares } from "./middlewares.js";
// Routes
import { authRoutes } from "./auth/auth_router.js";
import { teamRoutes } from "./team/team_router.js";

const app = express();
const port = 3000;

middlewares.setupMiddlewares(app);
app.get("/", (req, res)=>{
    res.status(200).send("Hello World!");
});
app.use("/auth", authRoutes);
app.use("/team", teamRoutes);

app.listen(port, ()=>{
    console.log("Servidor iniciado en el puerto 3000")
});

export { app };