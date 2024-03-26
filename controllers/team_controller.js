const teamController = {};

const teamDB = {};

import { getUser } from "./users_controller.js";

teamController.auth = async (req, res) => {
    try {

        console.log("El body trae: ");
        console.log(req.body);

        /*
        let user = getUser(req.user.userId);

        console.log("El usuario es: ");
        console.log(user);

        res.status(200).json({
            trainer: user.userName,
            team: teamController.getTeam(req.user.userId)
        });
        */
       
    } catch (error) {
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}


teamController.bootstrapTeam = (userId) =>{
    teamDB[userId] = [{name: "Charizard"}, {name: "Blastoise"}];
}

teamController.addPokemon = (userId, pokemonName) => {
    teamDB[userId].push({name: pokemonName});
}

teamController.setTeam = (userId, team) => {
    teamDB[userId] = team;
}

teamController.getTeam = (userId) => {
    return teamDB[userId];
}


export { teamController };