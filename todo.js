 function addTask() {
            var taskInput = document.getElementById('taskInput').value;
        
            if (taskInput === '') {
                alert('Please enter a task!');
                return;
            }
        
            var taskList = document.getElementById('taskDisplay'); //creates a new variable tasklist and the tasks displayed from class="taskDisplay" is encapsulated here
            var taskItem = document.createElement('li'); // creates a list of tasks and eachItem is created seperately
            
            var checkbox = document.createElement('input'); // new variable checkbox is created and the checkbox is taken as input to show if the task is completed or not
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskItem.classList.add('completed');
                } else {
                    taskItem.classList.remove('completed');
                }
            });
        
            var label = document.createElement('label'); //creates a new task item with a checkbox and a label containing the task name
            label.appendChild(checkbox);                 //The task item is then added to the task list then it clears the input field, ready for the next task to be entered.
            label.appendChild(document.createTextNode(taskInput));
            
            //block of code that deletes a task using "X" symbol
            var deleteSymbol = document.createElement('span');
            deleteSymbol.textContent = 'X';
            deleteSymbol.className = 'deleteSymbol';
            deleteSymbol.addEventListener('click', function() {
                deleteTaskItem(taskItem);
            });
            label.appendChild(deleteSymbol);
        
            taskItem.appendChild(label);
            taskList.appendChild(taskItem);
        
            document.getElementById('taskInput').value = '';
        }

        function deleteTaskItem(taskItem){
            taskItem.remove();
        }
        
        function filterTasks(filter) {
            var taskItems = document.querySelectorAll('#taskDisplay li');
        
            taskItems.forEach(function(taskItem) {   // here we pass a parameter of taskItem and forEach function is used to iterate the items through list of tasks to check
                if (filter === 'active' && !taskItem.classList.contains('completed')) {     //if task is active or not then it is filted based on these conditions.
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
        
        document.addEventListener('DOMContentLoaded', function() {  // function for taking the input from the input tag upon clivking the "enter key"
            var taskInput = document.getElementById('taskInput');
            var filterRadios = document.querySelectorAll('input[name="filter"]');
            var addButton = document.getElementById('addButton');
     // new event listener is added to the button element in the JavaScript code using addEventListener,
            // then event listener is triggered when the button is clicked, and it calls the addTask function.
        
            taskInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    addTask();
                }
            });
        
            filterRadios.forEach(function(radio) {    // sets up event listeners on the filter radio buttons, when the user selects a different filter option,
                radio.addEventListener('change', function() { // the event listener retrieves the selected value, triggers the filterTasks function to filter and display the tasks accordingly
                    var filter = this.value;
                    filterTasks(filter);
                });
            });
            // new event listener is added to the button element in the JavaScript code using addEventListener,
            // then event listener is triggered when the button is clicked, and it calls the addTask function.
            addButton.addEventListener('click', function() {
                addTask();
              });
        });
