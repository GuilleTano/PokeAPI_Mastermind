import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de pruebas team', () => {

    // Obtener el equipo del usuario logueado
    it('should return the team of the given user', (done) => {
        // Primero debe loguearse el usuario
        request(app)
        .post("/auth/login")
        .set("content-type", "application/json")
        .send({userName: "bettatech", password: "1234"})
        .end((err, res)=>{
            assert.equal(res.statusCode, 200);
            // Luego hacemos un get a team para obtener el equipo del usuario
            request(app)
            .get("/team")
            .set('Authorization', `JWT ${res.body.token}`)
            .end((err, res)=>{
                // Tiene equipo con Charizard y Blastoise
                // { trainer: "bettatech", team: [Pokemon] }
                assert.equal(res.statusCode, 200);
                assert.equal(res.body.trainer, "bettatech");
                assert.equal(res.body.team.length, 2);
                assert.equal(res.body.team[0].name, "Charizard");
                assert.equal(res.body.team[1].name, "Blastoise");
                done();
            })
        });
    });

});
