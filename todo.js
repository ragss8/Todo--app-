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

            // Add class for hover effect
            label.classList.add('hoverEffect');

            // Add event listeners for hover events
            label.addEventListener('mouseenter', function() {
                showOptions(label);
            });

            label.addEventListener('mouseleave', function() {
                hideOptions(label);
            });

            // Create delete button
            var deleteButton = document.createElement('span');
            deleteButton.textContent = 'X';
            deleteButton.className = 'deleteButton';
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevents triggering the parent label's click event
                deleteTask(taskItem);
            });
            label.appendChild(deleteButton);

            taskItem.appendChild(label);
            taskList.appendChild(taskItem);

            document.getElementById('taskInput').value = '';
        }

        function deleteTask(taskItem) {
            taskItem.remove();
        }

        function editTask(label) {
            var currentText = label.textContent;

            // Remove delete button from the label
            var deleteButton = label.lastElementChild;
            deleteButton.remove();

            // Create an input field for editing
            var editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = currentText;
            editInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    updateTask(label, editInput.value);
                }
            });

            // Replace the label with the input field
            label.textContent = '';
            label.appendChild(editInput);
            editInput.focus();
        }

        function updateTask(label, newText) {
            // Remove the input field and update the label with the new text
            var editInput = label.firstElementChild;
            label.removeChild(editInput);
            label.textContent = newText;

            // Add the checkbox and delete button back to the label
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    label.parentElement.classList.add('completed');
                } else {
                    label.parentElement.classList.remove('completed');
                }
            });
            label.insertBefore(checkbox, label.firstChild);

            var deleteButton = document.createElement('span');
            deleteButton.textContent = 'X';
            deleteButton.className = 'deleteButton';
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevents triggering the parent label's click event
                deleteTask(label.parentElement);
            });
            label.appendChild(deleteButton);
        }

        function showOptions(label) {
            label.style.backgroundColor = '#f0f0f0';
        }

        function hideOptions(label) {
            label.style.backgroundColor = 'transparent';
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
            var addButton = document.getElementById('addButton');

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

            addButton.addEventListener('click', function() {
                addTask();
            });

            // Event delegation for editing tasks
            var taskList = document.getElementById('taskDisplay');
            taskList.addEventListener('click', function(event) {
                if (event.target.tagName === 'LABEL') {
                    editTask(event.target);
                }
            });
        });
