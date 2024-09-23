const BtnAddTask = document.querySelector('.app__button--add-task');
const BtnFormAddTask = document.querySelector('.app__form-add-task');
const BtnFormCancelTask = document.querySelector('.app__form-footer__button--cancel');
const BtnRemoveTarefa = document.getElementById('btn-remover-concluidas');
const BtnRemoveTodas = document.getElementById('btn-remover-todas');
const textArea = document.querySelector('.app__form-textarea');
//local de exibição de todas as tarefas
const exibirTarefa = document.querySelector('.app__section-task-list');
//input de tarefa em andamento
const descTarefaAndamento = document.querySelector('.app__section-active-task-description');

//array de tarefas do user
//JSON.parse() transforma a string do localStorage em um objeto tasks (caso exista já no início)
//caso não existam tarefas, retorna array vazio
let tasks = JSON.parse(localStorage.getItem('Tarefas')) || [];
//objeto da tarefa
let tarefaSelecionada = null;
//"texto" da tarefa
let opcaoTarefaSelecionada = null;


//adiciona e retira classe hidden do text area
BtnAddTask.addEventListener('click', () => {
    BtnFormAddTask.classList.toggle('hidden');

    BtnFormCancelTask.addEventListener('click', cancelaTarefa);
});

BtnFormAddTask.addEventListener('submit', (event) => {
    //evita o refresh padrão ao clicar no button salvar
    event.preventDefault();

    /*
    objeto tarefa representa uma tarefa a ser feita pelo user. Essa tarefa recebe um objeto
    cuja descrição é o valor do do textArea
    */

    const tarefa = {
        descricao: textArea.value,
    };

    tasks.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    exibirTarefa.append(elementoTarefa);

    attTarefas();

    textArea.value = '';
    BtnFormAddTask.classList.add('hidden');
});

//função para criar tarefa no layout pré-estabelecido
//para cada tarefa inserida no array, cria uma tarefa para exibir
tasks.forEach((tarefa) => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    exibirTarefa.append(elementoTarefa);
});

BtnRemoveTarefa.onclick = () => removeTarefa(true);
BtnRemoveTodas.onclick = () => removeTarefa(false);
/*========================
INICIO criarElementoTarefa
========================*/
//função para criar a tarefa no layout desejado (lista, paragrafo, classes)
function criarElementoTarefa(tarefa) {
    const lista = document.createElement('li');
    lista.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `;

    const paragrafro = document.createElement('p');
    paragrafro.classList.add('app__section-task-list-item-description');
    paragrafro.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    //botão de editar tarefas
    botao.onclick = () => {
        const novaDesc = prompt('Qual o novo nome da tarefa?');
        if (novaDesc) {
            paragrafro.textContent = novaDesc;
            tarefa.descricao = novaDesc;
            attTarefas();
        } else return;
    };

    const imgBotao = document.createElement('img');
    imgBotao.setAttribute('src', '/imagens/edit.png');

    //append insere um elemento dentro de outro
    //criando efeito "cascata"
    botao.append(imgBotao);
    lista.append(svg);
    lista.append(paragrafro);
    lista.append(botao);

    if (tarefa.completa) {
        lista.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', '');
    } else{
        //adiciona border na tarefa selecionada
        lista.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach((elemento) => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
            if (tarefaSelecionada == tarefa) {
                descTarefaAndamento.textContent = '';
                tarefaSelecionada = null;
                opcaoTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            opcaoTarefaSelecionada = lista;
            descTarefaAndamento.textContent = tarefa.descricao;
            lista.classList.add('app__section-task-list-item-active');
        };
    }

    //cria o elemento lista(e seus appends) e retorna
    return lista;
}
/*========================
FIM criarElementoTarefa
========================*/

//listener para o evento Custom em main.js para adicionar completed e disabled às tarefas finalizadas
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && opcaoTarefaSelecionada) {
        opcaoTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        opcaoTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        opcaoTarefaSelecionada.querySelector('button').setAttribute('disabled', '');
        tarefaSelecionada.completa = true;
        attTarefas();
    }
});


//função para atualizar tarefas no localStorage
function attTarefas() {
    //JSON.stringify transforma o array tasks em ums string
    //desse modo o método não retorna [object Object]
    //localStorage trabalha apenas com string
    localStorage.setItem('Tarefas', JSON.stringify(tasks));
}

const cancelaTarefa = () => {
    textArea.value = '';
    BtnFormAddTask.classList.add('hidden');
};

const removeTarefa = (apenasCompletas) => {
    //var = condição ? se verdadeiro : se falso
    // tarefas concluídas passam apenasCompletas true, tarefas não concluidas passam false
    //o que alterna a classe do seletor
    const seletor = apenasCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();       
    });
    //se completo, filtra. Caso falso, envia array vazio
    tasks = apenasCompletas ? tasks.filter(tarefa => !tarefa.completa) : [];
    attTarefas();
}