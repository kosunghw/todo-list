import { format } from "date-fns";
import Project, { createProject } from "./Project";
import Task, { createTask } from "./Task";
import TodoList from "./TodoList";

export default class UI {
  static projectArray = [];
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
      "08-24-2024",
      "MEDIUM"
    );
    const exampleTask2 = createTask(
      "Todo List",
      "Solve problems on LeetCode",
      "08-24-2024",
      "MEDIUM"
    );
    exampleProject1.toDoList.appendTask(exampleTask1);
    exampleProject1.toDoList.appendTask(exampleTask2);
    UI.projectArray.push(exampleProject1);
    UI.projectArray.push(exampleProject2);
    UI.render();
    UI.showProjectContent(exampleProject1);
  }

  static cacheDOM() {
    this.addProjectBtn = document.querySelector("#add-project-btn");
    this.projectDialog = document.querySelector("#add-project-dialog");
    this.addTaskBtn = document.querySelector("#add-task-btn");
    this.taskDialog = document.querySelector("#add-task-dialog");
    this.projectCloseBtn = document.querySelector("#project-dialog-close");
    this.taskCloseBtn = document.querySelector("#task-dialog-close");
    this.projectForm = document.querySelector("#add-project-form");
    this.taskForm = document.querySelector("#add-task-form");
    this.projectContainer = document.querySelector(".project-container");
    this.deleteProjectBtn = document.querySelector("#delete-project-btn");
    this.contentContainer = document.querySelector(".content");
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
      }
    });
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

  static deleteProject(target) {
    console.log("delete button clicked");
    const projectName = target.parentNode.children[1].textContent;
    UI.projectArray.forEach((project) => {
      if (projectName === project.name) {
        const index = UI.projectArray.indexOf(project);
        UI.projectArray.splice(index, 1);
      }
    });

    target.parentNode.remove();
  }

  static findProject(target) {
    const projectName = target.children[1].textContent;
    for (let i = 0; i < UI.projectArray.length; i++) {
      if (projectName === UI.projectArray[i].name) {
        return UI.projectArray[i];
      }
    }
  }

  static showProjectContent(project) {
    this.contentContainer.innerHTML = "";
    const projectTitle = document.createElement("h1");
    const taskDiv = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    projectTitle.textContent = project.name;
    if (project.toDoList.list.length > 0) {
      project.toDoList.list.forEach((task) => {
        taskDiv.appendChild(UI.createTaskDiv(task));
      });
    }
    addTaskBtn.textContent = "Add Task";

    this.contentContainer.appendChild(projectTitle);
    this.contentContainer.appendChild(taskDiv);
    this.contentContainer.appendChild(addTaskBtn);
    // this.contentContainer.appendChild(UI.createAddTaskForm());
  }

  static createTaskDiv(task) {
    const taskDiv = document.createElement("div");
    const taskTitle = document.createElement("div");

    taskTitle.textContent = task.title;
    taskDiv.appendChild(taskTitle);
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
