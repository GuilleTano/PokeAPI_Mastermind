import { assert } from 'chai';
import { app } from '../../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';
import { userController } from "../../auth/user_controller.js";
import { teamController } from '../team_controller.js';
use(superagent());

beforeEach(async () => {
    await userController.registerUser("bettatech", "1234");
    await userController.registerUser("mastermind", "1235");
});

afterEach(async () => {
    await userController.cleanUpUsers();
    await teamController.cleanUpTeam();
});

describe('Suite de pruebas team', () => {
    // Obtener el equipo del usuario logueado
    it('should return the team of the given user', (done) => {
        // Team de pruebas 
        const testTeam = [{ name: "Charizard" }, { name: "Blastoise" }];
        // Primero debe loguearse el usuario
        request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ userName: "bettatech", password: "1234" })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                const loginToken = res.body.token;
                // Seteamos el equipo del usuario cuando se registra o loguea
                request(app)
                    .put("/team")
                    .send({
                        team: testTeam
                    })
                    .set('Authorization', `JWT ${loginToken}`)
                    .end((err, res) => {
                        // Luego hacemos un get a team para obtener el equipo del usuario
                        request(app)
                            .get("/team")
                            .set('Authorization', `JWT ${loginToken}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.userName, "bettatech");
                                assert.equal(res.body.team.team.length, testTeam.length);
                                assert.equal(res.body.team.team[0].name, testTeam[0].name);
                                assert.equal(res.body.team.team[1].name, testTeam[1].name);
                                done();
                            })
                    })
            });
    });

    // Agregar un pokemon al equipo del usuario
    it('should return the pokedex number', (done) => {
        // Pokemon de prueba 
        const pokemonName = "Bulbasaur";
        // Primero debe loguearse el usuario
        request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ userName: "bettatech", password: "1234" })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                const loginToken = res.body.token;
                // Hacemos un post para agregar el pokemon al equipo
                request(app)
                    .post("/team/pokemons")
                    .send({ name: pokemonName })
                    .set('Authorization', `JWT ${loginToken}`)
                    .end((err, res) => {

                        // Luego hacemos un get a team para obtener el equipo del usuario
                        request(app)
                            .get("/team")
                            .set('Authorization', `JWT ${loginToken}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200);
                                assert.equal(res.body.userName, "bettatech");
                                assert.equal(res.body.team.team.length, 1);
                                assert.equal(res.body.team.team[0].name, pokemonName);
                                assert.equal(res.body.team.team[0].pokedexNumber, 1);
                                done();
                            })
                    })
            });
    });

    // Eliminar un pokemon del equipo del usuario
    it('should return the team of the given user without the removed pokemon', (done) => {
        // Team de pruebas
        const testTeam = [{ name: "Charizard", pokedexNumber: 6 }, { name: "Blastoise", pokedexNumber: 9 }];
        // Primero debe loguearse el usuario
        request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ userName: "bettatech", password: "1234" })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                const loginToken = res.body.token;
                // Seteamos el equipo del usuario cuando se loguea
                request(app)
                    .put("/team")
                    .send({ team: testTeam })
                    .set('Authorization', `JWT ${loginToken}`)
                    .end((err, res) => {
                        request(app)
                            .delete(`/team/pokemons/9`)
                            .set('Authorization', `JWT ${loginToken}`)
                            .end((err, res) => {
                                // Luego hacemos un get a team para obtener el equipo del usuario
                                request(app)
                                    .get("/team")
                                    .set('Authorization', `JWT ${loginToken}`)
                                    .end((err, res) => {
                                        assert.equal(res.statusCode, 200);
                                        assert.equal(res.body.userName, "bettatech");
                                        assert.equal(res.body.team.team.length, testTeam.length - 1);
                                        done();
                                    })
                            })
                    })
            });
    });

    // No puedes agregar un Pokemon si ya tienes 6
    it('should not be able to add pokemon if you already have 6', (done) => {
        // Team de pruebas
        const testTeam = [
            { name: "Charizard"},
            { name: "Blastoise"},
            { name: "Pikachu"},
            { name: "Vaporeon"},
            { name: "Ponyta"},
            { name: "Diglett"},
        ];
        // Primero debe loguearse el usuario
        request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({ userName: "bettatech", password: "1234" })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                const loginToken = res.body.token;
                // Seteamos el equipo del usuario cuando se loguea
                request(app)
                    .put("/team")
                    .send({ team: testTeam })
                    .set('Authorization', `JWT ${loginToken}`)
                    .end((err, res) => {
                        // Intentamos agregar un pokemon extra
                        request(app)
                            .post(`/team/pokemons`)
                            .send([{name:"Psyduck"}])
                            .set('Authorization', `JWT ${loginToken}`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 400);
                                done();
                            })
                    })
            });
    });


});
