const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Load tasks from localStorage
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("⚠ Please enter a task.");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
  taskInput.focus();
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}
