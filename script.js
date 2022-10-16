// domcontentloaded
window.addEventListener("DOMContentLoaded", function () {
  // create a tasks object with tasks id,description,priority
  let tasks = [
    {
      id: 1,
      description:
        "uis mollis, metus ac porttitor imperdiet, nisi dui dignissim eros",
      priority: "high",
    },
    {
      id: 2,
      description: "Nunc dictum sapien vel leo varius,",
      priority: "medium",
    },
    {
      id: 3,
      description:
        "Duis malesuada arcu at dui fringilla, sed convallis mauris fermentum",
      priority: "low",
    },
    {
      id: 4,
      description: "Duis lobortis ipsum eu odio rutrum",
      priority: "high",
    },
    {
      id: 5,
      description:
        "Mauris turpis lectus, aliquet at sapien a, tempor finibus nibh",
      priority: "medium",
    },
  ];

  // single tasks template
 
    let taskParent = document.querySelector("#task_parent");

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
        taskParent.innerHTML += TasksTemplate;

    });
        
    
});
