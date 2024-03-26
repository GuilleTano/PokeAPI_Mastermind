import { assert } from 'chai';
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de pruebas auth', () => {

    it('should return 401 when no jwt token available', (done) => {
        // Cuando la llamada no tiene correcta la llave
        request(app)                        // Indicamos que hacemos una request a nuestro servidor
        .get('/team')                       // Indicamos que la request es del tipo get al endpoint "/team"
        .end((err, res) => {                // Indicamos que es lo que se espera del test
            assert.equal(res.statusCode, 401); // En este test queremos que el status de la respuesta sea 401
            done();
        });
    });

    it("should return 400 when no data is provided", (done)=>{
        request(app).post("/auth/login").end((err, res) =>{
            assert.equal(res.statusCode, 400);
            done();
        });
    });

    it("should return 200 and token for succeful login", (done)=>{
        request(app).post("/auth/login").set("content-type", "application/json")
        .send({ userName: "bettatech", password: "1234" })
        .end((err, res)=>{
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it("should return 200 when jwt is valid", (done)=>{
        request(app).post("/auth/login")
        .set("content-type", "application/json")
        .send({userName: "bettatech", password: "1234"})
        .end((err, res)=>{
            // Expect valid login
            assert.equal(res.statusCode, 200);
            const token = res.body.token;
            console.log("Token que recibe el get del test:");
            console.log(token);
            request(app)
                .get("/team")
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    assert.equal(res.statusCode, 200);
                    done();
                })
        });
    });

});
