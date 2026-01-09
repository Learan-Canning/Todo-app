let tasks = [];

const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim()

    if(text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        updateStats();
        saveTasks();

    }
    
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;
    const progress = ( completedTasks/totalTask ) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTask}`;
};
const updateTaskList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''
    
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" onClick="editTask(${index})" />
                <img src="img/bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};
document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();  
    

    addTask();

});

// Initialize stats on page load
updateStats();