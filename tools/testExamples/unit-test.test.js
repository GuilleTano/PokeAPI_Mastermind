import { assert } from 'chai';

//Funcion de ejemplo que se quiere testear
function sumarNumeros(a, b){
    return a + b;
}

describe('Suite de prueba unitaria', () => {
    it("should return 2", () => {
        // Variable donde llamo a la función que quiero testear
        let miFuncion = sumarNumeros(1, 1);
        // Usando el tipo de test assert para verificar que se cumpla
        assert.equal(miFuncion, 2);
    });
});
