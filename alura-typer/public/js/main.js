// Muda o número de palavras de acordo com a frase.

var tempoInicial = $("#tempo-digitacao").text();   
var campo = $("#campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    atualizaContadores();
    inicializaCronometro();
    $("#btn-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
});


function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);
}

function atualizaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var numPalavras = conteudo.split(/\S+/).length - 1;
        $("#palavras-digitadas").text(numPalavras);
    
        var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
        var numCaracteres = conteudoSemEspaco.length;
        $("#caracteres-digitados").text(numCaracteres);
    });
}

function inicializaCronometro(){
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();

        $("#btn-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function(){
            tempoRestante--;
    
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){                
                clearInterval(cronometroID);
                $("#btn-reiniciar").attr("disabled", false);
                finalizaJogo();
                
            }
    
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}

function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
