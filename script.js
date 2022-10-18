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
          <button class="btn btn-primary" onclick="editTask(${task.id})" data-toggle="modal" data-target="#editTaskModal">Edit</button>
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

// edit tasks
const editTask = (id) => {
  tasks.forEach((task) => {
    if (task.id === id) {
      // check if #editTaskModal is in the DOM then remove the element
      if (document.querySelector("#editTaskModal")) {
        document.querySelector("#editTaskModal").remove();
      }

      // cteate a modal for editing task description and priority
      let editTaskModal = `
  <div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-labelledby="editTaskModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editTaskModalLabel">Edit Task</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="edit-task-description">Task Description</label>
            <input type="text" class="form-control" id="edit-task-description" placeholder="Enter Task Description" value=${task.description}>
          </div>
          <div class="form-group">
            <label for="edit-task-priority">Task Priority</label>
            <select class="form-control" id="edit-task-priority">
              <option id="option_high">High</option>
              <option id="option_medium">Medium</option>
              <option id="option_low">Low</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="saveEditTask(${id})">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `;

      // append the modal to the body
      document.body.insertAdjacentHTML("beforeend", editTaskModal);

      // #edit-task-priority - select the option with the given priority
      // if (task.priority === "High") {
      //   document.querySelector("#option_high").selected = true;
      // } else if (task.priority === "Medium") {
      //   document.querySelector("#option_medium").selected = true;
      // } else {
      //   document.querySelector("#option_low").selected = true;
      // } do the same thing using ternary operator
      document.querySelector(
        `#option_${task.priority.toLowerCase()}`
      ).selected = true;
    }
  });
};

// save the edited task
const saveEditTask = (id) => {
  // get the edited task description and priority
  let editedTaskDescription = document.querySelector(
    "#edit-task-description"
  ).value;
  let editedTaskPriority = document.querySelector("#edit-task-priority").value;
  // find the task with the given id and update the description and priority
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.description = editedTaskDescription;
      task.priority = editedTaskPriority;
    }
    return task;
  });
  // save the new tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // re-render the list
  renderTasks(tasks);
};

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
