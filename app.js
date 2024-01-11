// Selecting Elements From DOM
const input = document.querySelector(".input");
const addBtn = document.querySelector(".fa-add");
const taskUl = document.querySelector(".ul-list");
const errorP = document.querySelector(".errorP");
const taskLeftNum = document.querySelector(".taskLeftNum");
const taskLeftP = document.querySelector(".taskLeft");

// Setting UnDone Task
let unDoneTask = 0;

// Setting Up local Storage
const TaskArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

// Triggering Functions On Load
window.onload = function () {
    displayItems();
    taskLeft();
    input.focus();
};

// EVENT LISTENERS //

// Event Listener For AddBtn
addBtn.addEventListener("click", () => {
    createTask();
});

// Event Listener For "Enter" Key
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        createTask();
    }
});

//  FUNCTIONS //

// Displaying Items From The TaskArray Through LocalStorage
function displayItems() {
    // Looping Through TaskArray Through LocalStorage And Adding It In HTML
    for (let i = 0; i < TaskArray.length; i++) {
        if (TaskArray[i].taskDone === false) {
            taskUl.innerHTML += `<div class="ul-divs">
                                    <li>${TaskArray[i].task}</li>
                                    <div class="icon-container">
                                        <i class="fa fa-circle-check" id="${[
                                            i,
                                        ]}"></i>
                                        <i class="fa fa-trash" id='${[i]}'></i>
                                    </div>
                                </div>`;
        } else {
            taskUl.innerHTML += `<div class="ul-divs">
                                    <li class='line-through'>${
                                        TaskArray[i].task
                                    }</li>
                                    <div class="icon-container">
                                        <i class="fa fa-circle-check greenColor" id="${[
                                            i,
                                        ]}"></i>
                                        <i class="fa fa-trash" id='${[i]}'></i>
                                    </div>
                                </div>`;
        }
    }
    // Adding Event Listener
    deleteTask();
    taskDone();
}

// Creating The Task Function
function createTask() {
    // Checking If Task Is Empty Or Not
    if (input.value != "") {
        // Task Unique ID
        idNum = TaskArray.length - 1;
        // Pushing Task Array
        var taskObj = {
            task: input.value,
            taskID: TaskArray.length,
            taskDone: false,
        };
        TaskArray.push(taskObj);
        // Adding It To LocalStorage
        localStorage.setItem("tasks", JSON.stringify(TaskArray));
        location.reload();
        // Inserting Task With Inner HTML
        taskUl.innerHTML += `<div class="ul-divs">
                                <li>${input.value}</li>
                                <div class="icon-container">
                                    <i class="fa fa-circle-check" id="${idNum}"></i>
                                    <i class="fa fa-trash" id="${idNum}"></i>
                                </div>
                            </div>`;
        // Reseting Input Value
        input.value = "";
    } else {
        // Throwing Error
        showError(errorP, "Can't Enter A Empty Task", 2500);
    }
}

// Deleting The Task Function
function deleteTask() {
    document.querySelectorAll(".fa-trash").forEach((trash) => {
        trash.addEventListener("click", () => {
            // Removing From LocalStorage
            TaskArray.splice(trash.id, 1);
            localStorage.setItem("tasks", JSON.stringify(TaskArray));
            location.reload();
            // Removing Parent Element
            trash.parentElement.parentElement.remove();
        });
    });
}

// Task Done Function
function taskDone() {
    document.querySelectorAll(".fa-circle-check").forEach((check) => {
        check.addEventListener("click", () => {
            // Checking If Task Is Already Done
            if (TaskArray[check.id].taskDone === false) {
                // Updating LocalStorage
                TaskArray[check.id].taskDone = true;
                localStorage.setItem("tasks", JSON.stringify(TaskArray));
                location.reload();
                // Editing Parent Element
                var taskList =
                    check.parentElement.parentElement.firstElementChild;
                taskList.classList.add("line-through");
            } else {
                // Updating LocalStorage
                TaskArray[check.id].taskDone = false;
                localStorage.setItem("tasks", JSON.stringify(TaskArray));
                location.reload();
                // Editing Parent Element
                var taskList =
                    check.parentElement.parentElement.firstElementChild;
                taskList.classList.remove("line-through");
            }
        });
    });
}

// Task Left Function
function taskLeft() {
    for (let i = 0; i < TaskArray.length; i++) {
        if (TaskArray[i].taskDone === false) {
            unDoneTask += 1;
        }
    }
    taskLeftP.classList.remove("d-none");
    taskLeftNum.textContent = unDoneTask;
    if (unDoneTask > 0) {
        taskLeftNum.classList.toggle("redColor");
    } else {
        taskLeftNum.classList.toggle("greenColor");
    }
}

// Show Error Function
function showError(errorElement, errorMessage, time) {
    // Showing Error And It's Messege
    errorElement.textContent = `" ${errorMessage} "`;
    errorElement.classList.remove("d-none");
    // Hiding Error And It's Message After A Certian Time
    setTimeout(() => {
        errorP.textContent = "";
        errorP.classList.add("d-none");
    }, time);
}
