// Obtinene el elemento input de texto por su ID
const input = document.getElementById('input-task');
// const taskList = document.getElementById('task-list');

// Agrega un evento para escuchar la tecla 'Enter' y llamar a la funcion addTask()
input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


// funcion para agregar una tarea 
function addTask() {
    const textInput = input.value;
    // console.log(textInput);

    // Verifica que si el campo de entrada esta vacia y si no esta vacia, llama a la siguiente funcion createTask()
    if (textInput === '') {
        alert('Write something first!');
    } else {
        createTask(textInput);
        input.value = '';
      
    }

}

//funcion para agregar una nueva tarea 
function createTask(text) {
    //obtiene el elemento de la lista de tareas pos su ID y el boton de selecionar todas las tareas. 
    const taskList = document.getElementById('task-list');
    const selectAllButton = document.getElementById('select-all-button');
    selectAllButton.classList.remove('d-none'); // elimina la clase d-none para que se pueda ver el boton de selecionar todo
    
    // crea elementos HTML para representar a la tarea
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item', 'row');

    const taskRow = document.createElement('div');
    taskRow.classList.add('task-row', 'd-flex' ,'justify-content-between', 'align-items-center', 'gap-5', 'text-center');
    
    let icon1 = document.createElement('i');
    icon1.classList.add('fa-regular', 'fa-circle', 'circle', 'black', 'icon-size');

    let p = document.createElement('p');
    p.textContent = text;
    p.classList.add('task-text','incomplete', 'black');

    const icon2 = document.createElement('i');
    icon2.classList.add('fa-solid', 'fa-xmark', 'circle', 'orange', 'icon-size');


 
    // agrega los elementos al documento HTML
    taskRow.appendChild(icon1);
    taskRow.appendChild(p);
    taskRow.appendChild(icon2);

    taskItem.append(taskRow);

    // agrega clases a los iconos para marcar/completar y eliminar tareas
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
        // taskItem.classList.toggle('completed');
    });

    icon2.addEventListener('click', function () {
        taskItem.remove();
    });
   
    // console.log(p)
    // console.log(icon1)
    // console.log(icon2)
    // console.log(taskItem)

    taskList.appendChild(taskItem);



}

//funcion para seleccionar/deseleccioanr todas las tareas 
// esta funcion se llama cuando el usuario hace click en el boton select all
function checkAll() {
    
    const taskItems = document.querySelectorAll('.task-item'); //obtiene todos los elementos html con la clase 'task-item' (osea, las tareas individuales)
    const selectAllIcon = document.getElementById('select-all'); //obtiene el icono select all por su ID

    // si no hay tareas en la lista, no se hace nada y se sale de la funcnion
    if (taskItems.length === 0) {
        return;
    }

    // verifica el estado actual del icono select all
    if (selectAllIcon.classList.contains('fa-circle')){
        selectAllIcon.classList.replace('fa-circle', 'fa-circle-check'); // si el icono esta vacio, lo reemplaza por un circulo con marca de verificacion y le cambia el color
        selectAllIcon.classList.add('orange');
    } else { // sino pasa lo contrario y reemplaza el icono por un circulo vacio
        selectAllIcon.classList.replace('fa-circle-check', 'fa-circle');
    }

    // recorre todas las tareas individuales
    taskItems.forEach((taskItem) => {
        const icon1 = taskItem.querySelector('.fa-regular'); // obtiene el icono de circulo
        const p = taskItem.querySelector('.task-text'); // obtiene el parrafo que contiene el texto de la tarea

        // verifica el estado actual del icono de circulo
        if (icon1.classList.contains('fa-circle')) {
            // si el icono es un circulo vacio, lo reemplaca con el circulo con marca de verificacion o tick y se cambia la apariencia del textp
            icon1.classList.replace('fa-circle', 'fa-circle-check');
            p.classList.replace('incomplete', 'completed');
            p.classList.replace('black', 'orange');
            icon1.classList.replace('black', 'orange');

        } else {
            // si el icono es un circulo con marca de verificacion, lo reemplaza con el otro icono y cambia la aparicencia del texto tambien 
            icon1.classList.replace('fa-circle-check', 'fa-circle');
            p.classList.replace('completed', 'incomplete');
            p.classList.replace('orange', 'black');
            console.log(p)
            icon1.classList.replace('orange', 'black');
   
        }

    });

 

}

