import { userController } from "../auth/user_controller.js";
import { teamController } from "./team_controller.js";
import axios from 'axios'
const teamHttpHandler = {};

teamHttpHandler.getTeam = async (req, res) => {
    try {
        // Consultar Equipo
        let user = userController.getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamController.getTeam(req.user.userId)
        });
    } catch (error) {
        console.error("Error en el endpoint /team: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamHttpHandler.setTeam = async (req, res) => {
    try {
        // Setear Equipo
        teamController.setTeam(req.user.userId, req.body.team);
        res.status(200).send();
    } catch (error) {
        console.error("Error en el endpoint de /team: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamHttpHandler.addPokemon = async (req, res) => {
    try {
        const pokemonName = req.body.name;
        // LLamada con Axios a PokeAPI
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const pokemonObj = {
            name: pokemonName, 
            pokedexNumber: response.data.id
        }
        teamController.addPokemon(req.user.userId, pokemonObj);
        res.status(201).json(pokemonObj);
    } catch (error) {
        console.error("Error en el endpoint team/pokemons: ", error);
        res.status(400).json({ message: error });
    }
}

teamHttpHandler.deletePokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokeid);
        let user = await userController.getUser(req.user.userId);
        teamController.removePokemon(user.userId, pokemonId);
        res.status(204).send();
    } catch (error) {
        console.error("Error en el endpoint /pokemons/:pokeid: ", error);
        res.status(400).json({ message: error });
    }
}

export { teamHttpHandler };