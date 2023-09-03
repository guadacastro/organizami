const input = document.getElementById("input-task");
const taskList = document.getElementById("task-list");



function addTask() {
    const textInput = input.value;
    // console.log(textInput);
    if (textInput === '') {
        alert("Write something first!");
    } else {
        createTask(textInput);
        input.value = "";
      
    }

}

function createTask(text) {
    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item", "row");

    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row", "d-flex" ,"justify-content-between", "align-items-center", "gap-5", "text-center");
    
    let icon1 = document.createElement("i");
    icon1.classList.add("fa-regular", "fa-circle", "circle");

    let p = document.createElement("p");
    p.textContent = text;
    p.classList.add("task-text",);

    const icon2 = document.createElement("i");
    icon2.classList.add("fa-solid", "fa-xmark", "circle", "orange");



    taskRow.appendChild(icon1);
    taskRow.appendChild(p);
    taskRow.appendChild(icon2);

    taskItem.append(taskRow);

    icon1.addEventListener("click", function () {
        if (icon1.classList.contains("fa-circle")){
            icon1.classList.replace("fa-circle", "fa-circle-check");
            p.classList.add("completed", "orange");
            icon1.classList.add("orange");
        } else {

            icon1.classList.replace("fa-circle-check", "fa-circle");
        }

    });

    icon2.addEventListener("click", function () {
        taskItem.remove();
    });
   
    console.log(p)
    console.log(icon1)
    console.log(icon2)
    console.log(taskItem)

    taskList.appendChild(taskItem);



}
