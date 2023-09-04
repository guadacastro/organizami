const input = document.getElementById('input-task');
// const taskList = document.getElementById('task-list');

input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const textInput = input.value;
    // console.log(textInput);
    if (textInput === '') {
        alert('Write something first!');
    } else {
        createTask(textInput);
        input.value = '';
      
    }

}

function createTask(text) {
    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item', 'row');

    const taskRow = document.createElement('div');
    taskRow.classList.add('task-row', 'd-flex' ,'justify-content-between', 'align-items-center', 'gap-5', 'text-center');
    
    let icon1 = document.createElement('i');
    icon1.classList.add('fa-regular', 'fa-circle', 'circle', 'black');

    let p = document.createElement('p');
    p.textContent = text;
    p.classList.add('task-text','incomplete', 'black');

    const icon2 = document.createElement('i');
    icon2.classList.add('fa-solid', 'fa-xmark', 'circle', 'orange');



    taskRow.appendChild(icon1);
    taskRow.appendChild(p);
    taskRow.appendChild(icon2);

    taskItem.append(taskRow);

    icon1.addEventListener('click', function () {
        if (icon1.classList.contains('fa-circle')){
            icon1.classList.replace('fa-circle', 'fa-circle-check');
            p.classList.replace('incomplete', 'completed');
            p.classList.replace('black', 'orange');
            icon1.classList.replace('black', 'orange');
            
        } else {
            icon1.classList.replace('fa-circle-check', 'fa-circle');
            p.classList.replace('orange', 'black');
            p.classList.replace('completed', 'incomplete');
            icon1.classList.add('black', 'orange');
        }
        // También puedes agregar la lógica adicional aquí para marcar la tarea como completada
        // taskItem.classList.toggle('completed');
    });

    icon2.addEventListener('click', function () {
        taskItem.remove();
    });
   
    console.log(p)
    console.log(icon1)
    console.log(icon2)
    console.log(taskItem)

    taskList.appendChild(taskItem);



}


function checkAll() {
    const taskItems = document.querySelectorAll('.task-item');
    const selectAllIcon = document.getElementById('select-all')

    if (selectAllIcon.classList.contains("fa-circle")){
        selectAllIcon.classList.replace('fa-circle', 'fa-circle-check');
        selectAllIcon.classList.add('orange');
    } else {
        selectAllIcon.classList.replace('fa-circle-check', 'fa-circle');
    }

    taskItems.forEach((taskItem) => {
        const icon1 = taskItem.querySelector('.fa-regular');
        const p = taskItem.querySelector('.task-text');

        if (icon1.classList.contains('fa-circle')) {
            icon1.classList.replace('fa-circle', 'fa-circle-check');
            p.classList.add('completed', 'orange');
            icon1.classList.add('orange');

        } else {
            icon1.classList.replace('fa-circle-check', 'fa-circle');
            p.classList.remove('completed', 'orange');
            icon1.classList.remove('orange');
   
        }

    });

 

}

