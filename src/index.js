document.addEventListener('DOMContentLoaded', () => {
  let tasks = []; // Array to store all tasks

  // DOM elements
  const taskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortAscButton = document.getElementById('sort-asc');
  const sortDescButton = document.getElementById('sort-desc');

  // Event listener for form submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing page

    // Get task details from input fields
    const taskDescription = document.getElementById('new-task-description').value;
    const taskPriority = document.getElementById('task-pripority').value;
    const taskDueDate = document.getElementById('task-due-date').value;

    if (taskDescription === "") return; // Prevent adding empty tasks

    // Create a new task object
    const task = {
      id: Date.now(),  // unique id for task
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate
    };

    // Add the task to the array
    tasks.push(task);
    renderTasks(tasks);

    // Clear the form
    taskForm.reset();
  });

  // Render tasks to the DOM
  function renderTasks(tasksArray) {
    taskList.innerHTML = ""; // Clear the list before rendering

    tasksArray.forEach(task => {
      // Create list item for task
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span>${task.description} (Due: ${task.dueDate})</span>
        <span>
          <button class="delete-task">Delete</button>
        </span>
      `;

      // Set priority color
      if (task.Priority === 'high') {
        taskItem.style.color = 'red';
      } else if (task.priority === 'medium') {
        taskItem.style.color = 'yellow';
      } else {
        taskItem.style.color = 'green';
      }

      // Add delete functionality
      const deleteButton = taskItem.querySelector('.delete-task');
      deleteButton.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks(tasks);  // Re-render the task list
      });

      // Append the task item to the list
      taskList.appendChild(taskItem);
    });
  }

  // Sort tasks in ascending order based on priority
  sortAscButton.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    renderTasks(tasks);
  });

  // Sort tasks in descending order based on priority
  sortDescButton.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    renderTasks(tasks);
  });
});