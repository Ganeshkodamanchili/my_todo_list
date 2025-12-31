const quotes = [
  "Discipline beats motivation.",
  "Do it now or regret later.",
  "Small progress is still progress.",
  "Focus on what matters.",
  "Consistency creates success."
];

// SIGNUP
function signup() {
  const user = signupUser.value.trim();
  const pass = signupPass.value.trim();

  if (!user || !pass) return alert("All fields required");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.user === user)) {
    return alert("User already exists");
  }

  users.push({ user, pass, tasks: [] });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(u => u.user === user && u.pass === pass);

  if (!found) return alert("Invalid credentials");

  localStorage.setItem("currentUser", user);
  window.location.href = "todo.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function checkAuth() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
  }
}

// QUOTE
function loadQuote() {
  quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

// TASKS
function loadTasks() {
  const user = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  let current = users.find(u => u.user === user);

  taskList.innerHTML = "";

  current.tasks.forEach((t, i) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.onchange = () => toggleTask(i);

    const span = document.createElement("span");
    span.innerText = `${t.text} ⏰ ${t.time}`;
    if (t.done) span.classList.add("done");

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskText.value.trim();
  const time = taskTime.value;

  if (!text) return alert("Enter task");

  let users = JSON.parse(localStorage.getItem("users"));
  const user = localStorage.getItem("currentUser");
  let current = users.find(u => u.user === user);

  current.tasks.push({ text, time, done: false });
  localStorage.setItem("users", JSON.stringify(users));

  taskText.value = "";
  taskTime.value = "";
  loadTasks();
}

function toggleTask(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  const user = localStorage.getItem("currentUser");
  let current = users.find(u => u.user === user);

  current.tasks[i].done = !current.tasks[i].done;
  localStorage.setItem("users", JSON.stringify(users));
  loadTasks();
}

// SHOW / HIDE PASSWORD
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    icon.innerText = "🙈";
  } else {
    input.type = "password";
    icon.innerText = "👁";
  }
}
