document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
  const todoInput = document.getElementById('todoInput').value;

  if (todoInput) {
    const todo = {
      task: todoInput,
      progress: []
    };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
  }
}

function loadTodos() {
  displayTodos();
}

function displayTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'mb-6';

    const title = document.createElement('h3');
    title.className = 'font-bold mb-2';
    title.innerText = todo.task;
    li.appendChild(title);

    const progressInput = document.createElement('input');
    progressInput.type = 'number';
    progressInput.min = 0;
    progressInput.max = 100;
    progressInput.placeholder = 'Enter progress (%)';
    progressInput.className = 'w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-2';
    progressInput.setAttribute('data-index', index);
    li.appendChild(progressInput);

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Progress';
    saveButton.className = 'bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-blue-600 mr-2';
    saveButton.onclick = () => saveProgress(index, progressInput.value);
    li.appendChild(saveButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Task';
    deleteButton.className = 'bg-red-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-red-600';
    deleteButton.onclick = () => deleteTask(index);
    li.appendChild(deleteButton);

    const chartCanvas = document.createElement('canvas');
    chartCanvas.id = `progressChart-${index}`;
    chartCanvas.className = 'mt-4';
    li.appendChild(chartCanvas);

    todoList.appendChild(li);

    displayProgressChart(index, chartCanvas);
  });
}

function saveProgress(index, progress) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  if (progress && index >= 0 && index < todos.length) {
    const inputDate = new Date().toLocaleDateString(); // Automatically use current date

    let existingProgress = todos[index].progress.find(p => p.date === inputDate);

    if (existingProgress) {
      // Update existing progress
      existingProgress.progress = parseInt(progress);
    } else {
      // Add new progress entry
      todos[index].progress.push({
        date: inputDate,
        progress: parseInt(progress)
      });
    }

    localStorage.setItem('todos', JSON.stringify(todos));
    const chartCanvas = document.getElementById(`progressChart-${index}`);
    displayProgressChart(index, chartCanvas);
  }
}

function deleteTask(index) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1); // Remove the task from the array
    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage
    displayTodos(); // Refresh the displayed list
  }
}

function displayProgressChart(index, chartCanvas) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  if (index >= 0 && index < todos.length) {
    const todo = todos[index];
    const labels = todo.progress.map(p => p.date);
    const data = todo.progress.map(p => p.progress);

    const backgroundColors = data.map((value, i) => {
      if (i === 0 || value >= data[i - 1]) {
        return 'rgba(75, 192, 192, 0.2)'; // Greenish background when progress is stable or increasing
      } else {
        return 'rgba(255, 99, 132, 0.2)'; // Red background when progress decreases
      }
    });

    const borderColors = data.map((value, i) => {
      if (i === 0 || value >= data[i - 1]) {
        return 'rgba(75, 192, 192, 1)'; // Greenish border when progress is stable or increasing
      } else {
        return 'rgba(255, 99, 132, 1)'; // Red border when progress decreases
      }
    });

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Progress (%)',
          data: data,
          borderColor: borderColors,
          backgroundColor: backgroundColors,
          fill: true,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}
