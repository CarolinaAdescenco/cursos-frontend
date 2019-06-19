var xhr = new XMLHttpRequest();

// passa 1º o método e depois o link que será consumido
xhr.open('GET', 'https://api.github.com/users/carolinaadescenco');
xhr.send(null);

xhr.onreadystatechange = function(){
    // 4 é o código de quando a resposta chegou
    if(xhr.readyState === 4){
        console.log(JSON.parse(xhr.responseText));
    }
}