const input = document.querySelector("#input");
const addBtn = document.getElementById("add");
const ulList = document.getElementById("ulList");
const totalTodo = document.getElementById("totalTodosThere");
const tododone = document.getElementById("totalTodosDoen");
const progressContainer = document.querySelector(".progress-bar");
const progress = document.getElementById("progress");
const error = document.getElementById("error");

function addTodos(e) {
    //creating element 
    let li = document.createElement("li");
    let span = document.createElement("span");
    let edit = document.createElement("button");
    let delect = document.createElement("button");
    //adding context to the elements and appending it to there parents
    if (input.value === "") {
        error.style.display = "block"
        return false;
    }
    if (addBtn.innerHTML === "Edit") {
        addBtn.innerHTML = "Add"
    }
    li.innerHTML = input.value;
    span.setAttribute("id", "E&D");
    edit.innerHTML = "✏️";
    delect.innerHTML = "❌";
    edit.setAttribute("id", "edit");
    delect.setAttribute("id", "delect");
    span.prepend(edit);
    span.append(delect);
    li.appendChild(span);
    ulList.appendChild(li)
    input.value = ""
    totalTodo.innerHTML = ulList.children.length;
    error.style.display = "none"
    //todo will be saved and loaded after page open and after refresh
    todoStorage();
    loadTodo();
}

function todoChecked(e) {

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.id === "delect") {
        e.target.parentElement.parentElement.remove();
        totalTodo.innerHTML = ulList.children.length;
    } else if (e.target.id === "edit") {
        input.value = e.target.closest("li").childNodes[0].textContent.trim();
        e.target.parentElement.parentElement.style.opacity = "0.6";
        addBtn.innerHTML = "Edit";
        e.target.parentElement.parentElement.remove();
    }
    tododone.innerHTML = ulList.querySelectorAll("li.checked").length;
    let width = (ulList.querySelectorAll("li.checked").length / ulList.children.length) * 100
    progress.style.width = `${width}%`
    todoStorage();
    loadTodo()
}

function todoStorage() {
    localStorage.setItem("Todos", ulList.innerHTML);
}
function loadTodo() {
    ulList.innerHTML = localStorage.getItem("Todos")
    totalTodo.innerHTML = ulList.children.length;
    tododone.innerHTML = ulList.querySelectorAll("li.checked").length;
    let width = (ulList.querySelectorAll("li.checked").length / ulList.children.length) * 100
    progress.style.width = `${width}%`
}

loadTodo()

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodos(e);
    }
})
ulList.addEventListener("click", todoChecked)
addBtn.addEventListener("click", addTodos)