import { format, compareAsc } from "date-fns";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";
import Storage from "./Storage";

export default class UI {
  static projectArray = [];
  static inboxArray = new TodoList();

  static init() {
    UI.cacheDOM();
    UI.bindEventHandler();
    UI.renderProjects();
  }

  static renderProjects() {
    if (Storage.checkStorage()) {
      Storage.getProjects(UI.projectArray);
      UI.render();
      UI.showContent(UI.projectArray[0].name);
    } else {
      UI.initializeStorage();
      UI.render();
      UI.showContent("Inbox");
    }
  }

  static initializeStorage() {
    const exampleProject1 = new Project(
      "Study",
      "black",
      false,
      new TodoList()
    );
    const exampleProject2 = new Project(
      "Grocery Shopping",
      "red",
      false,
      new TodoList()
    );

    const exampleTask1 = new Task(
      "JavaScript Course",
      "Finish the JavaScript Course by the end of September",
      new Date("09-30-2024"),
      "MEDIUM",
      "Study"
    );
    const exampleTask2 = new Task(
      "The Odin Project",
      "Finish The Odin Project by the end of the year",
      new Date("12-31-2024"),
      "HIGH",
      "Study"
    );

    const exampleTask3 = new Task(
      "Buy coffee",
      "NEED CAFFEINE",
      new Date("08-31-2024"),
      "HIGH",
      "Grocery Shopping"
    );

    const exampleTask4 = new Task(
      "Buy Oatmeal",
      "Nothing to eat in the morning",
      new Date("08-30-2024"),
      "LOW",
      "Grocery Shopping"
    );

    exampleProject1.toDoList.appendTask(exampleTask1);
    exampleProject1.toDoList.appendTask(exampleTask2);
    exampleProject2.toDoList.appendTask(exampleTask3);
    exampleProject2.toDoList.appendTask(exampleTask4);

    Storage.setProjectToStorage(exampleProject1);
    Storage.setProjectToStorage(exampleProject2);

    UI.projectArray.push(exampleProject1);
    UI.projectArray.push(exampleProject2);
  }

  static cacheDOM() {
    // Buttons
    this.addProjectBtn = document.querySelector("#add-project-btn");
    this.addTaskBtn = document.querySelector("#add-task-btn");
    this.taskCloseBtn = document.querySelector(".task-dialog-close");
    this.projectCloseBtn = document.querySelector("#project-dialog-close");

    //Dialogs
    this.projectDialog = document.querySelector("#add-project-dialog");
    this.taskDialog = document.querySelector("#add-task-dialog");

    // Forms
    this.projectForm = document.querySelector("#add-project-form");
    this.taskForm = document.querySelector("#add-task-form");

    // Containers
    this.projectContainer = document.querySelector(".project-container");
    this.contentContainer = document.querySelector(".content");

    // Nav bar
    this.inbox = document.querySelector("#inbox");
    this.today = document.querySelector("#today");
    this.thisWeek = document.querySelector("#week");

    this.taskProjectSelector = document.querySelector("#task-project-select");
  }

  static bindEventHandler() {
    // Open Form to add project
    this.addProjectBtn.addEventListener(
      "click",
      UI.openProjectModal.bind(this)
    );

    // Close Form
    this.projectCloseBtn.addEventListener(
      "click",
      UI.closeProjectModal.bind(this)
    );

    // Open Form to add Task
    this.addTaskBtn.addEventListener("click", UI.openTaskModal.bind(this));

    // Close Form
    this.taskCloseBtn.addEventListener("click", UI.closeTaskModal.bind(this));

    // Add a new project
    this.projectForm.addEventListener("submit", UI.addNewProject.bind(this));

    // Add a new task
    this.taskForm.addEventListener("submit", UI.addNewTask.bind(this));

    // Click on dynamically created elements
    document.addEventListener("click", function (e) {
      const projectNav = e.target.closest(".project-container-item");
      const nav = e.target.closest(".nav-item-container");
      const completeBtn = e.target.closest(".task-complete-btn");
      const deleteTaskBtn = e.target.closest(".task-delete-btn");
      const deleteProjectBtn = e.target.closest(".delete-project-btn");

      if (projectNav && !e.target.matches(".delete-project-btn")) {
        const project = UI.findProject(projectNav);
        UI.showContent(project.name);
      } else if (nav) {
        UI.showContent(nav.children[1].textContent);
      } else if (completeBtn) {
        UI.deleteTask(completeBtn);
      } else if (deleteTaskBtn) {
        UI.deleteTask(deleteTaskBtn);
      } else if (deleteProjectBtn) {
        UI.deleteProject(deleteProjectBtn);
      }
      e.stopPropagation();
    });
  }

  static openProjectModal() {
    this.projectDialog.showModal();
  }

  static closeProjectModal() {
    this.projectDialog.close();
    this.projectForm.reset();
  }

  static openTaskModal() {
    this.taskDialog.showModal();
  }

  static closeTaskModal() {
    this.taskDialog.close();
    this.taskForm.reset();
  }

  static render() {
    UI.projectArray.forEach((project) => {
      if (!project.rendered) {
        const name = project.name;
        const color = project.color;
        project.render();
        UI.createProjectDiv(name, color);
        UI.addProjectOption(name);
      }
    });
  }

  static addProjectOption(name) {
    const option = document.createElement("option");
    option.setAttribute("value", name);
    option.innerText = name;

    this.taskProjectSelector.appendChild(option);
  }

  // Delete Project from select input when adding a task
  static deleteProjectOption(name) {
    const options = this.taskProjectSelector.children;
    for (let i = 0; i < options.length; i++) {
      if (options[i].textContent === name) {
        options[i].remove();
      }
    }
  }

  static createProjectDiv(name, color) {
    const projectItem = document.createElement("div");
    const projectName = document.createElement("div");
    const deleteBtn = document.createElement("button");

    projectName.classList.add("project-name");
    projectName.textContent = name;
    deleteBtn.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" width="16px" height="16px"><path style="fill:none;stroke:#000000;stroke-miterlimit:10;" d="M11.5,4v8.5c0,0.552-0.448,1-1,1h-6c-0.552,0-1-0.448-1-1V4"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="5.5" y1="5" x2="5.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="7.5" y1="5" x2="7.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="9.5" y1="5" x2="9.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="2" y1="3.5" x2="13" y2="3.5"/><path style="fill:none;stroke:#000000;stroke-linecap:square;stroke-miterlimit:10;" d="M9.5,3.5V2.497C9.5,1.946,9.054,1.5,8.503,1.5H6.497C5.946,1.5,5.5,1.946,5.5,2.497V3.5"/></svg>`;
    deleteBtn.classList.add("delete-project-btn");
    deleteBtn.classList.add("hide");

    projectItem.classList.add("project-container-item");
    projectItem.innerHTML = `<span class="${color}"></span>`;
    projectItem.appendChild(projectName);
    projectItem.appendChild(deleteBtn);
    this.projectContainer.appendChild(projectItem);
    UI.cacheDOM;
    UI.bindEventHandler;
  }

  static addNewProject(event) {
    event.preventDefault();
    const name = document.querySelector("#project-name").value;
    const color = document.querySelector("#project-color").value;
    let project;
    // Check if project array has a project with the same name
    if (
      UI.projectArray.some(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Same project name exists");
    } else {
      project = new Project(name, color, false, new TodoList());
      UI.projectArray.push(project);
    }
    this.projectDialog.close();
    this.projectForm.reset();

    UI.render();
    UI.showContent(name);
    Storage.setProjectToStorage(project);
  }

  static addNewTask(event) {
    event.preventDefault();
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const date = document.querySelector("#date").value.split("-"); // ['YYYY', 'MM', 'DD']
    // Reformat dates to get the correct date
    const dueDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
    const priority = document.querySelector("#priority").value.toUpperCase();
    const projectSelected = document.querySelector(
      "#task-project-select"
    ).value;

    const task = new Task(
      name,
      description,
      dueDate,
      priority,
      projectSelected
    );
    if (projectSelected === "inbox") {
      UI.inboxArray.appendTask(task);
      UI.inboxArray.sortByDueDate();
      UI.showContent("Inbox");
    } else {
      const project = UI.findProject(projectSelected);
      project.toDoList.appendTask(task);
      UI.showContent(projectSelected);
    }
    // UI.allTaskArray.appendTask(task);

    Storage.setTaskToStorage(task);
    this.taskDialog.close();
    this.taskForm.reset();
  }

  static deleteProject(target) {
    const projectName = target.parentNode.children[1].textContent;
    const containerName = this.contentContainer.children[0].textContent;
    const project = UI.findProject(projectName);

    // delete project from storage
    Storage.deleteProjectFromStorage(project);

    UI.projectArray = UI.projectArray.filter(
      (project) => project.name !== projectName
    );

    // If deleted project was showing and project array is not empty
    if (projectName === containerName && UI.projectArray.length > 0) {
      UI.showContent(UI.projectArray[0].name);
    } else if (projectName === containerName && UI.projectArray.length === 0) {
      UI.showContent("inbox");
    } else {
      UI.showContent(containerName);
    }

    target.parentNode.remove();
    UI.deleteProjectOption(projectName);
  }

  // Delete Task
  static deleteTask(target) {
    let taskName = target.parentNode.children[1].textContent;
    let containerName = this.contentContainer.children[0].textContent;
    let projectName = target.parentNode.children[4].children[1].textContent;

    const project = UI.findProject(projectName);
    const task = UI.findTask(taskName, project);

    // delete task from project's todo list
    project.toDoList.deleteTask(taskName);

    // delete from storage
    Storage.deleteTaskFromStorage(task, project.toDoList);

    if (containerName === "Inbox") {
      UI.showContent("Inbox");
    } else if (containerName === "Today") {
      UI.showContent("Today");
    } else if (containerName === "Next 7 Days") {
      UI.showContent("Next 7 days");
    } else {
      UI.showContent(projectName);
    }

    // Storage.deleteTaskFromStorage(task);
  }

  static findProject(target) {
    if (typeof target === "string") {
      if (target.toLowerCase() === "inbox") {
        return "Inbox";
      }
      for (let i = 0; i < UI.projectArray.length; i++) {
        if (target === UI.projectArray[i].name) {
          return UI.projectArray[i];
        }
      }
    }
    const projectName = target.children[1].textContent;
    for (let i = 0; i < UI.projectArray.length; i++) {
      if (projectName === UI.projectArray[i].name) {
        return UI.projectArray[i];
      }
    }
  }

  static findTask(taskName, project) {
    for (let i = 0; i < project.toDoList.length; i++) {
      if (taskName === project.toDoList.list[i].title) {
        return project.toDoList.list[i];
      }
    }
  }

  static showContent(event) {
    let name;
    if (typeof event !== "string") {
      name = event.currentTarget.textContent;
    } else {
      name = event;
    }
    this.contentContainer.innerHTML = "";
    const title = document.createElement("h1");
    const taskNumber = document.createElement("div");
    const taskDiv = document.createElement("div");

    taskNumber.classList.add("task-number");

    title.classList.add("title");
    let taskArray;
    if (name.toLowerCase() === "inbox") {
      taskArray = UI.inboxArray;
      title.textContent = "Inbox";
    } else if (name.toLowerCase() === "today") {
      taskArray = UI.allTaskArray();
      taskArray.filterByToday();
      title.textContent = "Today";
    } else if (name.toLowerCase() === "next 7 days") {
      title.textContent = "Next 7 Days";
      taskArray = UI.allTaskArray();
      taskArray.filterBySeven();
      taskArray.sortByDueDate();
    } else {
      title.textContent = name;
      taskArray = UI.findProject(name).toDoList;
      taskArray.sortByDueDate();
    }

    const length = taskArray.length;
    for (let i = 0; i < length; i++) {
      taskDiv.appendChild(UI.createTaskDiv(taskArray.list[i]));
    }
    if (length < 2) {
      taskNumber.textContent = `${length} task`;
    } else {
      taskNumber.textContent = `${length} tasks`;
    }
    taskDiv.classList.add("task-item-container");

    this.contentContainer.appendChild(title);
    this.contentContainer.appendChild(taskNumber);
    this.contentContainer.appendChild(taskDiv);
  }

  static createTaskDiv(task) {
    const taskDiv = document.createElement("div");
    const taskTitle = document.createElement("div");
    const taskDescription = document.createElement("div");
    const taskDueDate = document.createElement("div");
    const taskPriority = document.createElement("div");
    const taskProject = document.createElement("div");
    const taskProjectColor = document.createElement("span");
    const taskCompleteBtn = document.createElement("button");
    const taskDeleteBtn = document.createElement("button");
    const taskEditBtn = document.createElement("button");

    taskTitle.classList.add("task-title");
    taskDescription.classList.add("task-description");
    taskCompleteBtn.classList.add("task-complete-btn");
    taskDeleteBtn.classList.add("task-delete-btn");
    taskEditBtn.classList.add("task-edit-btn");
    taskDueDate.classList.add("task-due-date");
    taskProject.classList.add("task-project");
    taskPriority.classList.add("task-priority");

    const project = UI.findProject(task.project);
    taskProjectColor.classList.add("task-project");
    taskProjectColor.classList.add(`${project.color}`);

    if (task.priority === "HIGH") {
      taskPriority.classList.add("task-priority-high");
    } else if (task.priority === "MEDIUM") {
      taskPriority.classList.add("task-priority-medium");
    } else {
      taskPriority.classList.add("task-priority-low");
    }

    // Add text content to delete and edit button
    taskDeleteBtn.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" width="16px" height="16px"><path style="fill:none;stroke:#000000;stroke-miterlimit:10;" d="M11.5,4v8.5c0,0.552-0.448,1-1,1h-6c-0.552,0-1-0.448-1-1V4"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="5.5" y1="5" x2="5.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="7.5" y1="5" x2="7.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="9.5" y1="5" x2="9.5" y2="12"/><line style="fill:none;stroke:#000000;stroke-miterlimit:10;" x1="2" y1="3.5" x2="13" y2="3.5"/><path style="fill:none;stroke:#000000;stroke-linecap:square;stroke-miterlimit:10;" d="M9.5,3.5V2.497C9.5,1.946,9.054,1.5,8.503,1.5H6.497C5.946,1.5,5.5,1.946,5.5,2.497V3.5"/></svg>`;
    taskEditBtn.textContent = "edit";

    // Set ids to buttons

    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDueDate.textContent = format(task.dueDate, "MMM do',' yyyy");
    taskPriority.textContent = task.priority;

    taskProjectColor.style.fontFamily = "Fira Sans";
    taskProject.append(taskProjectColor);
    const projectName = document.createElement("span");
    projectName.textContent = task.project;
    taskProject.append(projectName);
    // taskProject.textContent = task.project;

    taskDiv.classList.add("task-item");
    taskDiv.appendChild(taskCompleteBtn);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskProject);
    // taskDiv.appendChild(taskEditBtn);
    taskDiv.appendChild(taskDeleteBtn);
    taskDiv.appendChild(taskDueDate);

    return taskDiv;
  }

  static createAddTaskForm() {
    const taskFormContainer = document.createElement("div");
    const taskNameInput = document.createElement("input");
    const taskDescription = document.createElement("textarea");

    taskFormContainer.classList.add("task-form-container");
    taskFormContainer.innerHTML =
      "<div><input type='text' id='task-name' placeholder='Task name'></div>" +
      "<div><textarea id='task-description' rows='1' placeholder='Description'></textarea></div>" +
      "<div class='task-btn-container'><button>Cancel</button><button type='submit'>Add Task</button></div>";

    taskNameInput.setAttribute("name", "task-name");
    taskNameInput.setAttribute("id", "task-name");

    taskDescription.setAttribute("id", "task-description");

    return taskFormContainer;
  }

  static allTaskArray() {
    const taskArray = new TodoList();
    for (let i = 0; i < UI.projectArray.length; i++) {
      for (
        let taskIndex = 0;
        taskIndex < UI.projectArray[i].toDoList.length;
        taskIndex++
      ) {
        taskArray.appendTask(UI.projectArray[i].toDoList.list[taskIndex]);
      }
    }
    return taskArray;
  }

  static createTaskForm() {
    const newForm = document.createElement("form");
    newForm.setAttribute("id", "add-task-form");
    newForm.innerHTML = `<div class="form-input">
          <label for="task-name">Title</label>
          <input required type="text" id="task-name" placeholder="Task name" />
        </div>
        <div class="form-input">
          <label for="task-description">Description (Optional)</label>
          <textarea
            id="task-description"
            rows="3"
            placeholder="Description"
          ></textarea>
        </div>
        <div class="form-input">
          <label for="date">Due Date</label>
          <input required type="date" id="date" />
          <label for="priority">Priority</label>
          <select required name="priority" id="priority">
            <option value="" disabled selected>Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>`;
    this.contentContainer.appendChild(newForm);
  }
}
