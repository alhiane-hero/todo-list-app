// dom elements that I will need:
const addTaskFormEl = document.getElementById('add-task-form');
const addTaskInputEl = document.getElementById('add-task-input');
const tasksBoxEl = document.getElementById('tasks-box');
const searchTaskInput = document.getElementById('search-task-input');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const inputs = document.querySelectorAll('.input');
const darkInput = document.getElementById('darkInput');
const darkLabel = document.getElementById('darkLabel');
const darkBall = document.getElementById('darkBall');

// empty inputs and focus on it:
function emptyInput(input) {
    input.value = '';
    input.focus();
} 

// Dark Mode:
darkLabel.addEventListener('click', _ => {
    darkBall.classList.toggle('toLeft');
    let root = document.querySelector(':root');
    if (darkBall.classList.contains('toLeft')) {
        root.style.setProperty('--white-color', '#222');
        root.style.setProperty('--black-color', '#fff');
        root.style.setProperty('--black-shadow', 'rgba(255, 255, 255, 0.5)');
    } else {
        root.style.setProperty('--white-color', '#fff');
        root.style.setProperty('--black-color', '#222');
        root.style.setProperty('--black-shadow', 'rgba(0, 0, 0, 0.1)');
    }
});

// label when input is focused:
inputs.forEach(input => {
    input.addEventListener('focus', _ => {
        input.parentElement.querySelector('label').classList.add('top');
    });
    input.addEventListener('blur', _ => {
        if (input.value === '') {
            input.parentElement.querySelector('label').classList.remove('top');
        }
    });
});

// get all tasks from localStorage and render it on screen:
function showTasks(tasksData) {
    // clear task container:
    tasksBoxEl.innerHTML = '';

    // let tasksData = getTasksFromLs();
    for (let i = 0; i < tasksData.length; i++) {
        createNewTask(tasksData[i]);
    }
}
showTasks(getTasksFromLs());

// create new task:
function createNewTask(value = addTaskInputEl.value) {
    let taskEl = document.createElement('div');
    taskEl.classList.add('task');
    let taskContent = `<h3 class="name">${value}</h3>
    <span class="remove-task-btn">
        <i class="fas fa-times"></i>
    </span>`;
    taskEl.innerHTML = taskContent;
    
    let removeTaskBtn = taskEl.querySelector('.remove-task-btn');
    removeTaskBtn.addEventListener('click', _ => {
        let isRemoved = confirm("Are you sure you want to delete this task?");
        if (isRemoved === true) {
            removeTasksFromLs(value);
            showTasks(getTasksFromLs());
            emptyInput(searchTaskInput);
        }
    });

    tasksBoxEl.appendChild(taskEl);
}

// submit addTaskForm:
addTaskFormEl.addEventListener('submit', event => {
    event.preventDefault();
    // addTaskInput value:
    let taskInputValue = addTaskInputEl.value;
    if (taskInputValue !== '') {
        createNewTask(taskInputValue);
        addTasksToLs(taskInputValue);
        emptyInput(addTaskInputEl);
    } else {
        alert('Please enter a task name!');
    }
});

// filter tasks:
searchTaskInput.addEventListener('input', event => {
    let filteredArr = getTasksFromLs();
    showTasks(filteredArr.filter(data => data.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1));
});

// clear tasks container:
clearTasksBtn.addEventListener('click', event => {
    event.preventDefault();
    let isCleared = confirm("Are you sure?");
    if (isCleared === true) {
        localStorage.clear();
        showTasks(getTasksFromLs());
        emptyInput(searchTaskInput);
    }
});

// add tasks to localStorage:
function addTasksToLs(taskData) {
    let tasksData = getTasksFromLs();
    localStorage.setItem('tasksData', JSON.stringify([...tasksData, taskData]));
}

// remove tasks from localStorage:
function removeTasksFromLs(taskData) {
    let tasksData = getTasksFromLs();
    let removedArr = tasksData.filter(value => value !== taskData);
    localStorage.setItem('tasksData', JSON.stringify(removedArr));
}

// ger tasks from localStorage:
function getTasksFromLs() {
    const tasksData = JSON.parse(localStorage.getItem('tasksData'));
    return localStorage.getItem('tasksData') !== null ? tasksData : [];
} 