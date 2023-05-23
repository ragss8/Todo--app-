// todo.js

function addTask() {
    var taskInput = document.getElementById('taskInput').value;

    if (taskInput === '') {
        alert('Please enter a task!');
        return;
    }

    var taskList = document.getElementById('taskDisplay');
    var taskItem = document.createElement('li');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
    });

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(taskInput));

    taskItem.appendChild(label);
    taskList.appendChild(taskItem);

    document.getElementById('taskInput').value = '';
}

function filterTasks(filter) {
    var taskItems = document.querySelectorAll('#taskDisplay li');

    taskItems.forEach(function(taskItem) {
        if (filter === 'active' && !taskItem.classList.contains('completed')) {
            taskItem.style.display = 'block';
        } else if (filter === 'completed' && taskItem.classList.contains('completed')) {
            taskItem.style.display = 'block';
        } else if (filter === 'all') {
            taskItem.style.display = 'block';
        } else {
            taskItem.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var taskInput = document.getElementById('taskInput');
    var filterRadios = document.querySelectorAll('input[name="filter"]');

    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    filterRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            var filter = this.value;
            filterTasks(filter);
        });
    });
});

  