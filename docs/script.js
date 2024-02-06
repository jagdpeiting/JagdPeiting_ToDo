// script.js
let jagdstaende = [];

const jagdstaendeListe = document.getElementById("jagdstaende");
const addStandBtn = document.getElementById("addStandBtn");
const detailsContainer = document.getElementById("detailsContainer");
const standDetails = document.getElementById("standDetails");

function renderJagdstaende() {
  jagdstaendeListe.innerHTML = "";
  jagdstaende.forEach((stand, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${stand.name} - ${stand.ort}`;
    listItem.addEventListener("click", () => {
      showStandDetails(index);
    });
    jagdstaendeListe.appendChild(listItem);
  });
}

function showStandDetails(index) {
  const stand = jagdstaende[index];
  standDetails.innerHTML = `
    <h3>${stand.name}</h3>
    <p><strong>Ort:</strong> ${stand.ort}</p>
    <h4>To-Dos:</h4>
    <ul id="todosList"></ul>
    <button id="addTodoBtn">Todo hinzufügen</button>
    <button id="deleteStandBtn">Jagdstand löschen</button>
  `;
  const todosList = document.getElementById("todosList");
  todosList.innerHTML = "";
  stand.todos.forEach((todo, i) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `<input type="checkbox" id="todo${i}" ${todo.erledigt ? "checked" : ""}> <label for="todo${i}">${todo.text}</label>`;
    todosList.appendChild(todoItem);
  });

  const addTodoBtn = document.getElementById("addTodoBtn");
  addTodoBtn.addEventListener("click", () => {
    const text = prompt("Todo hinzufügen:");
    if (text) {
      stand.todos.push({ text, erledigt: false });
      showStandDetails(index);
      saveJagdstaende();
    }
  });

  const deleteStandBtn = document.getElementById("deleteStandBtn");
  deleteStandBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Möchtest du diesen Jagdstand wirklich löschen?");
    if (confirmDelete) {
      jagdstaende.splice(index, 1);
      renderJagdstaende();
      detailsContainer.style.display = "none";
      saveJagdstaende();
    }
  });

  detailsContainer.style.display = "block";
}

function saveJagdstaende() {
  localStorage.setItem("jagdstaende", JSON.stringify(jagdstaende));
}

function loadJagdstaende() {
  const storedJagdstaende = localStorage.getItem("jagdstaende");
  if (storedJagdstaende) {
    jagdstaende = JSON.parse(storedJagdstaende);
    renderJagdstaende();
  }
}

addStandBtn.addEventListener("click", () => {
  const name = prompt("Name des Jagdstandes:");
  const ort = prompt("Ort des Jagdstandes:");
  if (name && ort) {
    jagdstaende.push({ name, ort, todos: [] });
    renderJagdstaende();
    saveJagdstaende();
  }
});

loadJagdstaende();
