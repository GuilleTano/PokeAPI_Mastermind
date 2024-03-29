import { userController } from "./user_controller.js";
import axios from 'axios'
const teamController = {};
const teamDB = {};

teamController.getTeam = async (req, res) => {
    try {
        // Consultar Equipo
        let user = userController.getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamDB[req.user.userId]
        });
    } catch (error) {
        console.error("Error en el endpoint /team: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamController.setTeam = async (req, res) => {
    try {
        // Setear Equipo
        teamDB[req.user.userId] = req.body.team
        res.status(200).send();
    } catch (error) {
        console.error("Error en el endpoint de /team: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamController.addPokemon = async (req, res) => {
    try {
        const pokemonName = req.body.name;
        console.log("calling pokeAPI");
        // LLamada con Axios a PokeAPI
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        //console.log(response.data.id);
        const pokemonObj = {
            name: pokemonName, 
            pokedexNumber: response.data.id
        }
        teamDB[req.user.userId].push(pokemonObj);
        res.status(201).json(pokemonObj);
    } catch (error) {
        console.error("Error en el endpoint team/pokemons: ", error);
        res.status(400).json({ message: error });
    }
}

teamController.bootstrapTeam = (userId) => {
    teamDB[userId] = [];
}

export { teamController };