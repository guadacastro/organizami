// Objeto Task para representar una tarea
class Task {
    constructor(text) {
      this.text = text;
      this.completed = false;
    }
  
    toggleCompletion() {
      this.completed = !this.completed;
    }
  }
  
  // Objeto TodoList para representar la lista de tareas
  class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(text) {
      const task = new Task(text);
      this.tasks.push(task);
      return task;
    }
  
    removeTask(task) {
      const index = this.tasks.indexOf(task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    }

  }
  
 

  const input = document.getElementById('input-task');
  const taskList = new TodoList();
  
  input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
          addTask();
      }
  });
  
  function addTask() {
      const textInput = input.value;
      
      if (textInput === '') {
          alert('Write something first!');
      } else {
          const task = taskList.addTask(textInput);
          createTaskElement(task);
          input.value = '';

          console.log('[+] Tarea creada: ', task); 
      }

      
  }
  
  function createTaskElement(task) {
      const taskListElement = document.getElementById('task-list');
      const selectAllButton = document.getElementById('select-all-button');
      selectAllButton.classList.remove('d-none');
      
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item', 'row');
  
      const taskRow = document.createElement('div');
      taskRow.classList.add('task-row', 'd-flex' ,'justify-content-between', 'align-items-center', 'gap-5', 'text-center');
      
      let icon1 = document.createElement('i');
      icon1.classList.add('fa-regular', 'fa-circle', 'circle', 'black', 'icon-size');
  
      let p = document.createElement('p');
      p.textContent = task.text;
      p.classList.add('task-text', task.completed ? 'completed' : 'incomplete', 'black');
  
      const icon2 = document.createElement('i');
      icon2.classList.add('fa-solid', 'fa-xmark', 'circle', 'orange', 'icon-size');
  
      taskRow.appendChild(icon1);
      taskRow.appendChild(p);
      taskRow.appendChild(icon2);
      taskItem.append(taskRow);
  
      icon1.addEventListener('click', function () {
          task.toggleCompletion();
          p.classList.toggle('completed');
          p.classList.toggle('incomplete');
          icon1.classList.toggle('fa-circle');
          icon1.classList.toggle('fa-circle-check');
          p.classList.toggle('black');
          p.classList.toggle('orange');
          icon1.classList.toggle('black');
          icon1.classList.toggle('orange');
      });
  
      icon2.addEventListener('click', function () {
          taskList.removeTask(task);
          taskItem.remove();
      });
  
      taskListElement.appendChild(taskItem);
  }
  
  function checkAll() {
      const taskItems = document.querySelectorAll('.task-item');
      const selectAllIcon = document.getElementById('select-all');
  
      if (taskItems.length === 0) {
          return;
      }
  
      const isAllCompleted = taskList.tasks.every(task => task.completed);
  
      if (!isAllCompleted) {
          taskList.tasks.forEach(task => {
              if (!task.completed) {
                  task.toggleCompletion();
              }
          });
      } else {
          taskList.tasks.forEach(task => {
              task.toggleCompletion();
          });
      }
  
      updateTaskElements();
  }
  
  function updateTaskElements() {
      const taskItems = document.querySelectorAll('.task-item');
      
      taskItems.forEach((taskItem, index) => {
          const icon1 = taskItem.querySelector('.fa-regular');
          const p = taskItem.querySelector('.task-text');
          const task = taskList.tasks[index];
  
          if (task.completed) {
              icon1.classList.replace('fa-circle', 'fa-circle-check');
              p.classList.replace('incomplete', 'completed');
              p.classList.replace('black', 'orange');
              icon1.classList.replace('black', 'orange');
          } else {
              icon1.classList.replace('fa-circle-check', 'fa-circle');
              p.classList.replace('completed', 'incomplete');
              p.classList.replace('orange', 'black');
              icon1.classList.replace('orange', 'black');
          }
      });
  }
  


