// if have something in localStorage, name tasks then
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  tasks = [];
}

// render the tasks
const renderTasks = (tasks) => {
  let taskParent = document.querySelector("#task_parent");
  taskParent.innerHTML = "";
  // loop through tasks array and append to taskParent using TasksTemplate
  tasks
    .slice()
    .reverse()
    .forEach((task) => {
      let priority =
        task.priority === "High"
          ? "danger"
          : task.priority === "Medium"
          ? "warning"
          : "info";
      let TasksTemplate = `
     <tr class="task-body">
        <td class="task-description">${task.description}</td>
        <td class="task-priority"><span class="badge badge-${priority}">${task.priority}</span></td>
        <td class="task-action">
          <button class="btn btn-primary">Edit</button>
          <button type="submit" class="btn btn-danger delete-button" onclick="if(confirm('Are you sure?')) deleteTasks(${task.id})">Delete</button>
          
        </td>
        </tr>
    `;
      // empty the taskParent

      taskParent.insertAdjacentHTML("beforeend", TasksTemplate);
    });
};

function deleteTasks(id) {
  // filter out the task with the given id
  tasks = tasks.filter((task) => task.id !== id);
  // save the new tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // re-render the list
  renderTasks(tasks);
}

// jquery ready
window.addEventListener("DOMContentLoaded", () => {
  let NewTaskDescription = document.getElementById("new-task-description");
  let NewTaskPriority = document.getElementById("new-task-priority");
  let NewTaskSubmit = document.getElementById("new-task-submit");
  // NewTaskSubmit click and console.log the values
  NewTaskSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    let newTask = {
      id: Date.now(),
      description: NewTaskDescription.value,
      priority: NewTaskPriority.value,
    };
    // add the new task to tasks array by [...tasks,newTask]
    tasks = [...tasks, newTask];

    // stringify the tasks array and set it to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);
    // clear the input fields
    NewTaskDescription.value = "";
  });

  // =========================== First Load =========================== //
  renderTasks(tasks);
  // =========================== First Load =========================== //
});
