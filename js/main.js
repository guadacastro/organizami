
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
        // Intenta cargar las tareas desde el Local Storage
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
      taskList.saveTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

  }
  
 

  const input = document.getElementById('input-task');
  const taskList = new TodoList();

  document.addEventListener('DOMContentLoaded', function() {
    this.taskList = new TodoList();

    this.taskList.tasks.forEach(task => {
        createTaskElement(task);
    });

})
  
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

      taskList.saveTasks();
      
  }

//   function removeTask() {
//         // Busca la tarea en el array de tareas y elimínala
//     const index = taskList.tasks.indexOf(task);
//     if (index !== -1) {
//         taskList.tasks.splice(index, 1);
//     }

//     // Actualiza el Local Storage y remueve el elemento del DOM
//     taskList.saveTasks();
//     taskItem.remove();
//     taskList.saveTasks();
//   }
  
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
  



//   pomodoroooo

class PomodoroTimer {
    constructor() {
        this.pomodoroTime = 25 * 1; // 25 segundos
        this.breakTime = 5 * 1; // 5 segundos
        this.longBreakTime = 30 * 1; // 15 min en segundos
        this.time = this.pomodoroTime; // tiempo actual
        this.mode = 'pomodoro'; // modo actual
        this.timerInterval = null;
        this.isRunning = false;
        this.intervalCount = 0; //contador de intervalos
        this.maxIntervalCount = 5; // numero max de intervalos antes de cambiar a intervalos largos
        this.updateDisplay();

        // botones
        this.startButton = document.getElementById('start-button');
        
        this.resetButton = document.getElementById('reset-button');

        // eventos
        this.startButton.addEventListener('click', () => this.toggleTimer()); 
        this.resetButton.addEventListener('click', () => this.reset());
    }

    toggleTimer() {
        this.startIcon = document.getElementById('start-icon');
        
        if (!this.isRunning) {
            this.startIcon.classList.replace('fa-play', 'fa-pause');
            
            this.startTimer();
        } else {
            this.startIcon.classList.replace('fa-pause', 'fa-play');
            this.stopTimer();
        }
    }

    start() {
        this.isRunning = true;
        this.startTimer();
    }

    pause() {
        this.isRunning = false;
        this.stopTimer();
    }

    reset() {
        const pomodoroStatus = document.getElementById('navbarDropdown');
        pomodoroStatus.textContent = 'Pomodoro';
        this.isRunning = false;
        this.stopTimer();
        this.startIcon.classList.replace('fa-pause', 'fa-play');
        this.intervalCount = 0;
        this.mode = 'pomodoro';
        this.time = this.pomodoroTime;
        // this.showMessage('Pomodoro time')
        this.updateDisplay();
    }

    setPomodoro(withTime=true){
        const pomodoroStatus = document.getElementById('navbarDropdown');
        if (withTime) {
            this.time = this.pomodoroTime;
            // this.showMessage('Pomodoro');
            pomodoroStatus.textContent = 'Pomodoro'
            
        }
        this.endMessage = 'Pomodoro completed! Take a break';
        if(this.intervalCount >= this.maxIntervalCount){
            this.mode = 'longBreak';
        }else{
            this.mode = 'break';
        }
    }

    setBreak(withTime=true){
        const pomodoroStatus = document.getElementById('navbarDropdown');
        console.log(pomodoroStatus.textContent)
        if (withTime) {
            this.time = this.breakTime;
            // this.showMessage('Break');
            pomodoroStatus.textContent = 'Break';
        }
        this.endMessage = 'Break time is over! Get back to work';
        this.mode = 'pomodoro';
    }

    setLongBreak(){
        const pomodoroStatus = document.getElementById('navbarDropdown');
        // this.showMessage('Long break');
        pomodoroStatus.textContent = 'Long Break';
        this.time = this.longBreakTime;
        this.endMessage = 'Long break time is over! Get back to work';
        this.mode = 'pomodoro';
    }

    startTimer() {
        this.startIcon = document.getElementById('start-icon');
        this.isRunning = true;
        const finished = this.time == 0;
        if (this.mode === 'pomodoro') { 
            this.setPomodoro(finished);
        } else if (this.mode === 'break') {
            this.setBreak(finished);
        } else {
            this.setLongBreak(finished);
        }
        this.timerInterval = setInterval(() => {
            if (this.time > 0) {
                this.time--;
            } else {
                this.showMessage(this.endMessage);
                this.intervalCount++;
                this.startIcon.classList.replace('fa-pause', 'fa-play');
                this.stopTimer();
            }
            this.updateDisplay();
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
    }

    updateDisplay() {
        const timerDisplay = document.getElementById('pomodoro-timer');
        const timerStatus = document.getElementById('pomodoro-status');

        const minutes = Math.floor(this.isRunning ? this.time / 60 : this.time / 60);
        const seconds = this.isRunning ? this.time % 60 : this.time % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
    }

    showMessage(message) {
        const messageDisplay = document.getElementById('pomodoro-message');

        messageDisplay.innerHTML = `<p class = "align-self-center mb-0">${message}</p>`;

    }
}

const pomodoro = new PomodoroTimer();

