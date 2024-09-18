const addTaskBtn = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");

//array de tarefas do user
const tasks = [];

//adiciona e retira classe hidden do text area
addTaskBtn.addEventListener("click", () => {
    formAddTask.classList.toggle("hidden");
});

formAddTask.addEventListener("submit", (event) => {
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

    //JSON.stringify transforma o array tasks em ums string
    //desse modo o método não retorna [object Object]
    //localStorage trabalha apenas com string
    localStorage.setItem("Tarefas", JSON.stringify(tasks));
});

//função para criar tarefa no layout pré-estabelecido
function criarTarefa(tarefa) {
    const lista = document.createElement("li");
    lista.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `
    <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    `;

    const paragrafro = document.createElement("p");
    //paragrafro.classList.add("app__section-task-list-item-description");
    paragrafro.textContent = tarefa.descricao;

    const botao = document.createElement("button");
    const imgBotao = document.createElement("img");
    imgBotao.setAttribute("src", "/imagens/edit.png");

    //append insere um elemento dentro de outro
    //criando efeito "cascata"
    botao.append(imgBotao);
    lista.append(svg);
    lista.append(paragrafro);
    lista.append(botao);
}
