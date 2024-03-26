import express from "express";
import passport from "passport"     // Importo passport
import myPassport from "../auth.js"; // Importo mi configuracion de passport
import { teamController } from "../controllers/team_controller.js";
import { getUser } from "../controllers/users_controller.js";

const teamRoutes = express.Router();
myPassport();

// Como en app.js ya pondremos el endpoint en /team, aqui nos referimos a la raiz de /team
teamRoutes.route("/")
    .get(passport.authenticate("jwt", {session: false}), (req, res) => {
        // Consultar Equipo
        //console.log("Usuario autenticado:", req.user);
        let user = getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamController.getTeam(req.user.userId)
        });
    })
    .put((req, res)=>{

        teamController.setTeam(req.body.user, req.body.team);
    })

teamRoutes.route("/pokemons")
    .post((req, res)=>{
        // Agrega un pokemon
        res.status(200).send("Hello World!");
    })

teamRoutes.route("/pokemons/:pokeid")
    .delete((req, res)=>{
        // Elimina un pokemon
        res.status(200).send("Hello World!");
    })


export { teamRoutes };