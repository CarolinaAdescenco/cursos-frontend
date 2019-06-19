// axios é um encapsulamento em volta do XMLHttpRequest
axios.get('https://api.github.com/users/carolinaadescenco')
    .then(function(response){
        console.log(response.data.followers_url);
    })
    .catch(function(error){
        console.log(error);
    })