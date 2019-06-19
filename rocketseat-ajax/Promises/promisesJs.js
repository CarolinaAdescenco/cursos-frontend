// promises são promessas, ou seja, a resposta de alguma requisição
var minhaPromise = function(){
    
    //resolve função de resultado com sucesso 
    //reject  função de resultado com erro
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET','https://api.github.com/users/carolinaadescenco');
        xhr.send(null);

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject('Erro na requisição');
                }
            }
        }
    });
}

minhaPromise()
    //then será executado quando chamar o resolve na promise 
    .then(function(response){
        console.log(response);
    })

    // catch será executado quando chamar o reject na promise
    .catch(function(error){
        console.warn(error);
    })