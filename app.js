let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim()

    if(text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();

    }
    
};

const updateTaskList = () => {
    const taskList = document.getElementById('.task-list')
    taskList.innerHTML = ''
    
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                input type="checkbox" class"checkbox" ${task.completed} />
                <p>Finish this project</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" />
                <img src="img/bin.png" />
            </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();  
    

    addTask();

});