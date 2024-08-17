import { format } from "date-fns";
import Project, { createProject } from "./Project";
import Task, { createTask } from "./Task";
import TodoList from "./TodoList";

export default class UI {
  static projectArray = [];
  static taskArray = [];

  static init() {
    UI.cacheDOM();
    UI.bindEventHandler();
    UI.exampleProjects();
  }

  static exampleProjects() {
    const exampleProject1 = createProject("Study", "black");
    const exampleProject2 = createProject("Work", "red");

    const exampleTask1 = createTask(
      "LeetCode",
      "Solve problems on LeetCode",
      "AUG 24 2024",
      "MEDIUM"
    );
    const exampleTask2 = createTask(
      "Todo List",
      "Solve problems on LeetCode",
      "AUG 11 2024",
      "MEDIUM"
    );

    UI.taskArray.push(exampleTask1);
    UI.taskArray.push(exampleTask2);

    exampleProject1.toDoList.appendTask(exampleTask1);
    exampleProject1.toDoList.appendTask(exampleTask2);
    UI.projectArray.push(exampleProject1);
    UI.projectArray.push(exampleProject2);
    UI.render();
    UI.showProjectContent(exampleProject1);
  }

  static cacheDOM() {
    // Buttons
    this.addProjectBtn = document.querySelector("#add-project-btn");
    this.addTaskBtn = document.querySelector("#add-task-btn");
    this.taskCloseBtn = document.querySelector(".task-dialog-close");
    this.deleteProjectBtn = document.querySelector("#delete-project-btn");
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

    // Add a new project
    this.projectForm.addEventListener("submit", UI.addNewProject.bind(this));

    // Add a new task
    this.taskForm.addEventListener("submit", UI.addNewTask.bind(this));

    // Delete project
    document.addEventListener("click", function (e) {
      const target = e.target.closest("#delete-project-btn");

      if (target) {
        UI.deleteProject(target);
      }
      e.stopPropagation();
    });

    // Click on project
    document.addEventListener("click", function (e) {
      const target = e.target.closest(".project-container-item");
      if (target && !e.target.matches("button")) {
        const project = UI.findProject(target);
        UI.showProjectContent(project);

        // UI.showProjectContent(target);
      }
    });

    // Open Form to add Task
    this.addTaskBtn.addEventListener("click", UI.openTaskModal.bind(this));

    // Close Form
    this.taskCloseBtn.addEventListener("click", UI.closeTaskModal.bind(this));

    // Delete Task
    document.addEventListener("click", function (e) {
      const target = e.target.closest(".task-complete-btn");
      if (target) {
        UI.deleteTask(target);
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

  static createProjectDiv(name, color) {
    const projectItem = document.createElement("div");
    const projectName = document.createElement("div");
    const deleteBtn = document.createElement("button");

    projectName.classList.add("project-name");
    projectName.textContent = name;
    deleteBtn.setAttribute("id", "delete-project-btn");
    deleteBtn.classList.add("hide");
    deleteBtn.textContent = "delete";

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
    // Check if project array has a project with the same name
    if (
      UI.projectArray.some(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Same project name exists");
    } else {
      const newProject = createProject(name, color);
      UI.projectArray.push(newProject);
    }
    this.projectDialog.close();
    this.projectForm.reset();

    UI.render();
  }

  static addNewTask(event) {
    event.preventDefault();
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const date = document.querySelector("#date").value;
    const dueDate = format(date, "MMM dd yyyy");
    const priority = document.querySelector("#priority").value;
    const projectSelected = document.querySelector(
      "#task-project-select"
    ).value;

    const task = createTask(name, description, dueDate, priority);
    const project = UI.findProject(projectSelected);
    project.toDoList.appendTask(task);
    UI.TodoList.appendTask(task);

    this.taskDialog.close();
    this.taskForm.reset();

    UI.showProjectContent(project);
  }

  static deleteProject(target) {
    console.log("delete button clicked");
    const projectName = target.parentNode.children[1].textContent;
    UI.projectArray = UI.projectArray.filter(
      (project) => project.name !== projectName
    );
    console.log(UI.projectArray);

    target.parentNode.remove();
  }

  // Delete Task
  static deleteTask(target) {
    console.log("delete task button clicked");
    const projectName = this.contentContainer.children[0].textContent;
    const taskName = target.nextElementSibling.textContent;
    const project = UI.findProject(projectName);
    const projectTaskList = project.toDoList;

    projectTaskList.deleteTask(taskName);
    target.parentNode.remove();
    console.log(projectTaskList);

    UI.showProjectContent(project);
  }

  static findProject(target) {
    if (typeof target === "string") {
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

  static findTask(target, project) {
    if (typeof target === "string") {
      for (let i = 0; i < project.toDoList.length; i++) {
        if (target === project.toDoList.list[i].title) {
          return project.toDoList.list[i];
        }
      }
    }
  }

  static showProjectContent(project) {
    this.contentContainer.innerHTML = "";
    const projectTitle = document.createElement("h1");
    const taskNumber = document.createElement("div");
    const taskDiv = document.createElement("div");

    projectTitle.classList.add("title"); // Project title
    projectTitle.textContent = project.name;
    if (project.toDoList.list.length > 0) {
      project.toDoList.list.forEach((task) => {
        taskDiv.appendChild(UI.createTaskDiv(task));
      });
    }

    taskNumber.classList.add("project-task-number");
    if (project.toDoList.length < 2) {
      taskNumber.textContent = `${project.toDoList.length} task`;
    } else {
      taskNumber.textContent = `${project.toDoList.length} tasks`;
    }

    taskDiv.classList.add("task-item-container");

    this.contentContainer.appendChild(projectTitle);
    this.contentContainer.appendChild(taskNumber);
    this.contentContainer.appendChild(taskDiv);
    // this.contentContainer.appendChild(UI.createAddTaskForm());
  }

  static createTaskDiv(task) {
    const taskDiv = document.createElement("div");
    const taskTitle = document.createElement("div");
    const taskDueDate = document.createElement("div");
    const taskPriority = document.createElement("div");
    const taskCompleteBtn = document.createElement("button");

    taskCompleteBtn.classList.add("task-complete-btn");
    taskDueDate.classList.add("task-due-date");

    taskTitle.textContent = task.title;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;

    taskDiv.classList.add("task-item");
    taskDiv.appendChild(taskCompleteBtn);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskPriority);
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

    // taskFormContainer.appendChild(taskNameInput);
    // taskFormContainer.appendChild(taskDescription);
    return taskFormContainer;
  }
}
