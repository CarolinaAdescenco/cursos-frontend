var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

// var todos = [
//     'Fazer café',
//     'Estudar js',
//     'Acessar comunidade'
// ];

// definindo valores padrão caso não consiga retornar um valor viavel

// recebe o Json e transforma ele no formato correto
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos(){

    listElement.innerHTML = '';

    for(todo of todos){
        // cria o elemento li
        var todoElement = document.createElement('li');
        // coloca o valor dentro do elemento
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        // procura dentro do array o texto procurado
        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    var todoText = inputElement.value;

    // comando para adicionar elemento no array
    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos){
    // a partir da posição passada, remova o próximo item
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

// salvando no storage
function saveToStorage(){

    // convertendo o vetor em uma forma que possa ser salva no localStorage
    localStorage.setItem('list_todos', JSON.stringify(todos));
}