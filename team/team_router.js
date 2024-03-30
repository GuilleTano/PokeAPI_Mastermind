import express from "express";
import { teamController } from "./team_controller.js";
const teamRoutes = express.Router();

teamRoutes.route("/")
    .get(teamController.getTeam)
    .put(teamController.setTeam)

teamRoutes.route("/pokemons")
    .post(teamController.addPokemon)

teamRoutes.route("/pokemons/:pokeid")
    .delete(teamController.deletePokemon)

export { teamRoutes };