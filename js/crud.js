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
    localStorage.setItem("Tarefas", tasks);
});
