class ProxyFactory{

    static create(objeto, props, acao){

        return new Proxy(objeto, {            

            get(target, prop, receiver){                
            
                if(props.includes(prop) && ProxyFactory._verificaFuncao(target[prop])){

                    return function(){

                        console.log(`${prop} foi interceptado.`);
                        Reflect.apply(target[prop], target, arguments);

                        return acao(target);
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            }, 
            
            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) acao(target);    // só executa acao(target) se for uma propriedade monitorada
                return retorno; 
            }
            
        });
    }

    static _verificaFuncao(func){
        return typeof(func) == typeof(Function);
    }
}
