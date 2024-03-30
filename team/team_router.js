import express from "express";
import { teamHttpHandler } from "./team_http.js";
const teamRoutes = express.Router();

teamRoutes.route("/")
    .get(teamHttpHandler.getTeam)
    .put(teamHttpHandler.setTeam)

teamRoutes.route("/pokemons")
    .post(teamHttpHandler.addPokemon)

teamRoutes.route("/pokemons/:pokeid")
    .delete(teamHttpHandler.deletePokemon)

export { teamRoutes };