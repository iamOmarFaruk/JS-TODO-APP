// domcontentloaded
window.addEventListener("DOMContentLoaded", function () {
  // create a tasks object with tasks id,description,priority
  let tasks = [];

  // render the tasks
  function renderTasks(tasks) {
    let taskParent = document.querySelector("#task_parent");
    taskParent.innerHTML = "";
    // loop through tasks array and append to taskParent using TasksTemplate
    tasks.forEach((task) => {
      let priority = "info";
      if (task.priority === "high") {
        priority = "danger";
      } else if (task.priority === "medium") {
        priority = "warning";
      }
      let TasksTemplate = `
     <tr class="task-body">
        <td class="task-description">${task.description}</td>
        <td class="task-priority"><span class="badge badge-${priority}">${task.priority}</span></td>
        <td class="task-action">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger">Delete</button>
        </td>
        </tr>
    `;
      // empty the taskParent

      taskParent.insertAdjacentHTML("beforeend", TasksTemplate);
    });
  }

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
    renderTasks(tasks);
    console.log(tasks);
  });
  // =========================== First Load =========================== //
  // renderTasks(tasks);
  // =========================== First Load =========================== //
});
