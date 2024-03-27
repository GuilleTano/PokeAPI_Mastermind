import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

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
                // Seteamos el equipo del usuario logueado
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
                                assert.equal(res.body.trainer, "bettatech");
                                assert.equal(res.body.team.length, testTeam.length);
                                assert.equal(res.body.team[0].name, testTeam[0].name);
                                assert.equal(res.body.team[1].name, testTeam[1].name);
                                done();
                            })
                    })
            });
    });

});
