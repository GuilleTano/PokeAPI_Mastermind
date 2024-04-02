import mongoose from "mongoose";
const teamController = {};
let teamDB = [];

const TeamModel = mongoose.model("TeamModel", {userId: String, team: Array});


teamController.getTeam = (userId) => {
    return teamDB[userId];
}

teamController.setTeam = (userId, team) => {
    teamDB[userId] = team;
}

teamController.addPokemon = (userId, pokemon) => {
    if(teamDB[userId].length == 6){
        throw new Error();
    } else {
        teamDB[userId].push(pokemon);
    }
}

teamController.removePokemon = (userId, pokeId) => {
    if (teamDB[userId].some(poke => poke.pokedexNumber === pokeId)){
        let userTeam = (teamDB[userId]).filter(item => item.pokedexNumber !== pokeId);
        teamDB[userId] = userTeam;
    }
}

teamController.bootstrapTeam = async (userId) => {
    try{
        let newTeam = new TeamModel({
            userId: userId,
            team: []
        });
        await newTeam.save();
    } catch (err) {
        throw new Error(err);
    }
}
// Limpiar la base de datos (solo usar en test)
teamController.cleanUpTeam = () => {
    for (let user in teamDB){
        teamDB[user] = [];
    }
}

export {teamController}