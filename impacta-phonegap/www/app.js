var input_tarefa = document.getElementById('tarefa');
var btn_criar = document.getElementById('btn_criar');
var btn_concluir = document.getElementById('btn_concluir');
var btn_del_tarefa = document.getElementById('btn_del_tarefa');
var tbody = document.querySelector('#tarefas tbody');


btn_criar.onclick = function(){

	if (input_tarefa.value === '') {
		return;
	}

	var	tr = document.createElement('tr');
	
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');


	var data_atual = new Date();

	var check = document.createElement('input');
	check.type='checkbox';

	td1.prepend(check);
	// td1.innerHtml = '<input type="checkbox">';
	td2.innerText = input_tarefa.value;
	td3.innerText = data_atual.toLocaleString();



	// tr.append(td1,td2, td3); Não funciona em todos os navegadores
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);


	tbody.append(tr);


	input_tarefa.value = '';
	input_tarefa.focus();
}

btn_del_tarefa.onclick = function(){
	// capturando elementos com check
	var concluidos = document.querySelectorAll('#tarefas input:checked'); 

	for (var i = 0; i < concluidos.length; i++) {
		concluidos[i].parentNode.parentNode.remove(); 
		// apaga: tr > td > inputs
	}
}


$('#btn_concluir').click(function(){
	// $('#lista input:checked').parent().css('background-color', 'red');

	var lis = $('#tarefas input:checked').parent();

	$('#tarefas_concluidas').append(lis);


});