const teamController = {};
let teamDB = [];

teamController.getTeam = (userId) => {
    return teamDB[userId];
}

teamController.setTeam = (userId, team) => {
    teamDB[userId] = team;
}

teamController.addPokemon = (userId, pokemon) => {
    teamDB[userId].push(pokemon);
}

teamController.removePokemon = (userId, pokeId) => {
    if (teamDB[userId].some(poke => poke.pokedexNumber === pokeId)){
        let userTeam = (teamDB[userId]).filter(item => item.pokedexNumber !== pokeId);
        teamDB[userId] = userTeam;
    }
}

teamController.bootstrapTeam = (userId) => {
    teamDB[userId] = [];
}
// Limpiar la base de datos (solo usar en test)
teamController.cleanUpTeam = () => {
    for (let user in teamDB){
        teamDB[user] = [];
    }
}

export {teamController}