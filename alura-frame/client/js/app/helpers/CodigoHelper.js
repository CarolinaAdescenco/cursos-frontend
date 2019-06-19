class CodigoHelper{

    constructor(texto){
        if(!_valida(texto)) throw new Error (`O texto ${texto} é um código inválido.`)   
    }

    _valida(texto){
        return /\D{3}-D{2}-d{3}/.test(texto);
    }

    get texto(){
        return this._texto();
    }
}

let codigo1 = new Codigo('GWZ-JJ-12'); // válido
console.log(codigo1.texto);
let codigo2 = new Codigo('1X1-JJ-12'); // inválido
console.log(codigo2.texto);