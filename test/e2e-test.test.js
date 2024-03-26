import { assert } from 'chai';  // Using Assert style
import { app } from '../app.js';
import { use } from 'chai';
import superagent from 'chai-superagent';
import request from 'supertest';

use(superagent());

describe('Suite de prueba e2e', () => {
    it('should return Hello World!', (done) => {
        request(app)            // Indicamos que hacemos una request a nuestro servidor
        .get('/')               // Indicamos que la request es del tipo get al endpoint "/"
        .end((err, res) => {    // Indicamos que es lo que se espera del test
            assert.equal(res.text, "Hello World!")
            done();
        });
    });
});
