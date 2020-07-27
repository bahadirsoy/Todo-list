//Get elements
const addTodoForm = document.querySelector("form");
const addTodoInput = document.querySelector("#addTodoInput");
const searchTodo = document.querySelector("#searchTodo");
const todoList = document.querySelector(".card-body ul");
const deleteAllTodosButton = document.querySelector("#deleteAllTodos");
const emptyTodoAlert = document.querySelector("#emptyTodoAlert");
const similarityTodoAlert=document.querySelector("#similarityTodoAlert");


setEventListeners();


//Event listeners
function setEventListeners() {

    addTodoForm.addEventListener("submit", addTodoFromInput);
    todoList.addEventListener("click", deleteTodo);
    searchTodo.addEventListener("keyup", filterTodos);
    deleteAllTodosButton.addEventListener("click", deleteAllTodos);
    document.addEventListener("DOMContentLoaded", loadAllTodos);

}

//Load all todos at first
function loadAllTodos(e) {


    let todos = getTodosFromStorage();
    let todo;

    todos.forEach(function (element) {

        todo = createTodo(element);
        todoList.appendChild(todo);
        //console.log(element);

    })

}


//Delete all todos
function deleteAllTodos() {

    if (confirm("Are you sure that you want to delete all todos ?")) {
        const allTodos = document.querySelectorAll(".card-body ul li");

        allTodos.forEach(function (element) {
            element.remove();
        })

        localStorage.clear();
    }

}

//Get todos from local storage
function getTodosFromStorage() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

//Add todo to local storage
function addTodoToLocalStorage(text) {

    let todos = getTodosFromStorage();

    todos.push(text);

    localStorage.setItem("todos", JSON.stringify(todos));

}

//Filter todos
function filterTodos(e) {

    const todos = document.querySelectorAll("li");

    todos.forEach(function (element) {

        if (element.textContent.toLowerCase().indexOf(searchTodo.value.toLowerCase()) === -1) {
            element.setAttribute("style", "display: none !important");
        } else {
            element.setAttribute("style", "display: block !important");
        }

    })

}

//Delete todo from storage
function deleteTodoFromStorage(text) {

    let todos = getTodosFromStorage();

    todos.forEach(function (element, index) {
        if (element === text) {
            todos.splice(index, 1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));

}

//Delete todo
function deleteTodo(e) {

    if (e.target.className === "fas fa-times float-right") {
        e.target.parentElement.parentElement.remove();
    }

    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

    e.preventDefault();

}


//Check similarity
function checkTodoSmiliarity(text) {

    let todos = getTodosFromStorage();
    let result=false;

    todos.forEach(function (element) {

        if(element===text){
            result=true;
        }

    })

    return result;

}

//Check if todo is empty
function checkTodo(text) {
    if (text === "") {

        return true;

    }

    return false;
}



//Add todo from input
function addTodoFromInput(e) {
    //Get input value
    const inputValue = addTodoInput.value;

    //Check similarity
    if(checkTodoSmiliarity(inputValue)){
        similarityTodoAlert.setAttribute("style", "display: block");
        e.preventDefault();
        return;
    } else{
        similarityTodoAlert.setAttribute("style", "display: none");
        e.preventDefault();
    }

    //Check empty
    if (checkTodo(inputValue)) {

        emptyTodoAlert.setAttribute("style", "display: block");
        e.preventDefault();
        return;

    } else {
        emptyTodoAlert.setAttribute("style", "display: none");
        e.preventDefault();
    }

    //Create todo
    let newTodo = createTodo(inputValue);

    //Add to UI
    todoList.appendChild(newTodo);

    //Add to local storage
    addTodoToLocalStorage(inputValue);

    addTodoInput.value = "";

    e.preventDefault();

}

//Create todo
function createTodo(text) {

    //Creating 3 elements
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = text;

    const a = document.createElement("a");
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fas fa-times float-right";

    //Put them together
    a.appendChild(i);
    li.appendChild(a);

    //return it
    return li;

}


/* console.log(addTodoForm);
console.log(addTodoInput);
console.log(searchTodo);
console.log(todoList);
console.log(deleteAllTodos); */