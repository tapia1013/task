// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// Load all event  listeners
function loadEventListeners() {
  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event... 'click/submit' run addTask
  form.addEventListener('submit', addTask)

  // Remove task event
  taskList.addEventListener('click', removeTask)

  // Clear tasks
  clearBtn.addEventListener('click', clearTasks)

  // Filter through the tasks event
  filter.addEventListener('keyup', filterTasks)
}

// Get tasks from Local Storage
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  // Loop through tasks that are there
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li')
    // Add a class
    li.className = 'collection-item';
    //create textNode and append to li..whatever pass goes to cTN()
    li.appendChild(document.createTextNode(task))

    // create a new link element x to delete
    const link = document.createElement('a')
    // Add class to new created <a></a>
    link.className = 'delete-item secondary-content'
    // Add icon html to delete
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link)

    // Append li to UL
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  // Make sure theres a value
  if (taskInput.value === '') {
    alert('Add a task')
  }

  // Create li element
  const li = document.createElement('li')
  // Add a class
  li.className = 'collection-item';
  //create textNode and append to li..whatever pass goes to cTN()
  li.appendChild(document.createTextNode(taskInput.value))

  // create a new link element x to delete
  const link = document.createElement('a')
  // Add class to new created <a></a>
  link.className = 'delete-item secondary-content'
  // Add icon html to delete
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)

  // Append li to UL
  taskList.appendChild(li);

  // After we added to dom we call another function
  // STORE in LS
  storeTaskInLocalStorage(taskInput.value) // whatever passes gets passed through here()

  // Clear input
  taskInput.value = '';

  e.preventDefault()
}

// Store Task
function storeTaskInLocalStorage(task) {
  // initialize variable named task
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // have to parse cause LS only stores strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Then we push on to that variable
  tasks.push(task);

  // set it back to LS
  localStorage.setItem('tasks', JSON.stringify(tasks))

}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove from Loca Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  // set Local Storage
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Clear tasks function
function clearTasks(e) {
  // one way of doing it SLOW
  // taskList.innerHTML = ''; 

  // Second FASTER way of doing it with a while loop
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // Clear task from Local Storage
  clearTasksFromLocalStorage();

}

// CLear task from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// Filter tasks
function filterTasks(e) {
  // will log/get the text from filter
  const text = e.target.value.toLowerCase()

  // loop through al collection items with forEach
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      // we want the textConent of that child
      const item = task.firstChild.textContent;

      // if its not equal to -1
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block'
      } else {
        // if no match we hide it
        task.style.display = 'none'
      }
    }
  );

  // console.log(text);
}






























































































// https://jsperf.com/innerhtml-vs-removechild