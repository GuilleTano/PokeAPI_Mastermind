import mongoose from "mongoose";
const TeamModel = mongoose.model("TeamModel", { userId: String, team: Array });
const teamController = {};

// Limpiar la base de datos (solo usar en test)
teamController.cleanUpTeam = async () => {
    try {
        await TeamModel.deleteMany({});
        return
    } catch (err) {
        throw new Error(err);
    }
}

teamController.getTeam = async (userId) => {
    try {
        const dbTeam = await TeamModel.findOne({ userId: userId });
        return dbTeam || [];
    } catch (err) {
        throw new Error("Error al obtener el equipo: " + err);
    }
}

teamController.setTeam = async (userId, team) => {
    try {
        const dbTeam = await TeamModel.findOne({ userId: userId });
        dbTeam.team = team;
        await dbTeam.save();
        return
    } catch (err) {
        throw new Error("Error al setear equipo en usuario: " + err);
    }
}

teamController.addPokemon = async (userId, pokemon) => {
    try {
        const dbTeam = await TeamModel.findOne({ userId: userId });
        if (dbTeam.team.length == 6) {
            throw new Error("El equipo esta lleno");
        } else {
            dbTeam.team.push(pokemon);
            await dbTeam.save();
            return
        }
    } catch (err) {
        throw new Error("Error al cargar el equipo: " + err);
    }
}

teamController.removePokemon = async (userId, pokeId) => {
    try {
        const dbTeam = await TeamModel.findOne({ userId: userId });
        if (dbTeam.team.length == 0) throw new Error("El equipo no tiene ningun Pokémon");

        if ((dbTeam.team).some(poke => poke.pokedexNumber === pokeId)) {
            let newTeam = (dbTeam.team).filter(item => item.pokedexNumber !== pokeId);
            dbTeam.team = newTeam;
            await dbTeam.save();
            return
        } else {
            throw new Error("El Pokémon que desea eliminar no existe en este equipo");
        }
    } catch (err) {
        throw new Error("Error al eliminar un Pokémon: " + err);
    }
}

teamController.bootstrapTeam = async (userId) => {
    try {
        let dbTeam = new TeamModel({
            userId: userId,
            team: []
        });
        await dbTeam.save();
    } catch (err) {
        throw new Error("Error al crear equipo: " + err);
    }
}

export { teamController }