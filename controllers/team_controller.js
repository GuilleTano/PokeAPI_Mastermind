import { userController } from "./user_controller.js";
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
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamController.setTeam = async (req, res) => {
    try {
        // Setear Equipo
        teamDB[req.user.userId] = req.body.team
        res.status(200).send();
    } catch (error) {
        console.error("Error en el endpoint de login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

teamController.bootstrapTeam = (userId) => {
    teamDB[userId] = [];
}

teamController.addPokemon = (userId, pokemonName) => {
    teamDB[userId].push({ name: pokemonName });
}



export { teamController };