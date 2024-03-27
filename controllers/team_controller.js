import { userController } from "./user_controller.js";
const teamController = {};
const teamDB = {};

teamController.auth = async (req, res) => {
    try {
        // Consultar Equipo
        //console.log("Usuario autenticado:", req.user);
        let user = userController.getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamController.getTeam(req.user.userId)
        });
    } catch (error) {
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
/* teamController.auth es en realidad el getTeam ?*/
teamController.getTeam = (userId) => {
    return teamDB[userId];
}

teamController.setTeam = (userId, team) => {
    teamDB[userId] = team;
}

teamController.bootstrapTeam = (userId) => {
    teamDB[userId] = [];
}

teamController.addPokemon = (userId, pokemonName) => {
    teamDB[userId].push({ name: pokemonName });
}



export { teamController };