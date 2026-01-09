// Store all tasks in memory
let tasks = [];

// Save tasks to browser storage (localStorage) so they persist after refresh
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add a new task from user input
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim(); // Get input and remove extra spaces

  if (text) {
    // Create new task object with text and completed status
    tasks.push({ text: text, completed: false });
    taskInput.value = ""; // Clear input field
    updateTaskList(); // Refresh task display
    updateStats(); // Update progress bar and counter
    saveTasks(); // Save to localStorage
  }
};

// Toggle task between completed and incomplete when checkbox clicked
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};

// Remove a task from the list
const deleteTask = (index) => {
  tasks.splice(index, 1); // Remove task at index
  updateTaskList();
  updateStats();
  saveTasks();
};

// Load task text into input for editing, then remove original task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text; // Fill input with task text
  tasks.splice(index, 1); // Remove old task (user will re-add edited version)
  updateTaskList();
  updateStats();
  saveTasks();
};

// Update progress bar and task counter
const updateStats = () => {
  // Count how many tasks are marked complete
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;
  
  // Calculate progress percentage (prevent dividing by zero)
  const progress = totalTask === 0 ? 0 : (completedTasks / totalTask) * 100;
  
  // Update progress bar width
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  // Update counter display (e.g. "2 / 5")
  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTask}`;

  // Show confetti celebration when all tasks completed
  if (tasks.length && completedTasks === tasks.length) {
    blastConfetti();
  }
};

// Render all tasks on the page
const updateTaskList = () => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = ""; // Clear old list

  // Loop through each task and create HTML for it
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
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
    
    // Listen for checkbox changes
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

// Confetti celebration animation
const blastConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    // Stars confetti burst
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    // Circle confetti burst
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  // Fire confetti three times with delays
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

// Load saved tasks from storage when page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    // Add each saved task back into memory
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

// Handle add task button click
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // Stop form from submitting normally
  addTask();
});
