let todos = JSON.parse(localStorage.getItem('todos')) || [];
let alarms = {};

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('currentTime').textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);

function addTodoWithAlarm() {
  const todoInput = document.getElementById('todoInput');
  const alarmDate = document.getElementById('alarmDate');
  const alarmTime = document.getElementById('alarmTime');

  const todoText = todoInput.value.trim();
  const alarmDateTime = new Date(alarmDate.value + 'T' + alarmTime.value);

  if (todoText && !isNaN(alarmDateTime.getTime())) {
    const todo = {
      id: Date.now(),
      text: todoText,
      alarmTime: alarmDateTime.toISOString(),
      completed: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
    setAlarm(todo);

    todoInput.value = '';
    alarmDate.value = '';
    alarmTime.value = '';
  } else {
    alert('Please enter a valid todo and alarm time.');
  }
}

function setAlarm(todo) {
  const now = new Date();
  const alarmTime = new Date(todo.alarmTime);

  if (alarmTime > now) {
    const timeUntilAlarm = alarmTime.getTime() - now.getTime();
    alarms[todo.id] = setTimeout(() => triggerAlarm(todo), timeUntilAlarm);
  }
}

function triggerAlarm(todo) {
  playAlarmSound();
  showNotification(todo);
  delete alarms[todo.id];
}

function playAlarmSound() {
  const alarmSound = new Audio('alarm.mp3');
  alarmSound.play();
}

function showNotification(todo) {
  if (Notification.permission === 'granted') {
    new Notification('Todo Alarm', {
      body: todo.text,
    });
  }
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  clearTimeout(alarms[id]);
  delete alarms[id];
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'mb-2';
    li.innerHTML = `
      <span class="${todo.completed ? 'line-through' : ''}">${todo.text} (Alarm: ${new Date(todo.alarmTime).toLocaleString()})</span>
      <button onclick="toggleTodo(${todo.id})" class="ml-2 text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Toggle</button>
      <button onclick="deleteTodo(${todo.id})" class="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function requestNotificationPermission() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function (permission) {
      updatePermissionStatus();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        todos.forEach(setAlarm); 
      }
    });
  } else {
    todos.forEach(setAlarm); 
  }
  updatePermissionStatus();
}

function updatePermissionStatus() {
  const permissionStatus = document.getElementById('permissionStatus');
  permissionStatus.textContent = `Notification permission: ${Notification.permission}`;
}

document.addEventListener('DOMContentLoaded', function () {
  renderTodos();
  requestNotificationPermission();
});