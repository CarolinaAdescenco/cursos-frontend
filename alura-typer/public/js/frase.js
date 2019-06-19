$(function(){
    $("#botao-frase").click(fraseAleatoria);
    $("#botao-frase-id").click(buscaFrase)
});

function fraseAleatoria(){

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();

    var fraseId = $("#id-frase").val();
    var dados = {id: fraseId};

    $.get("http://localhost:3000/frases", dados, trocaFraseId)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseId(data){
    var frase = $(".frase");

    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}