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
    exampleProject1.toDoList.appendTask(exampleTask1);
    UI.projectArray.push(exampleProject1);
    UI.projectArray.push(exampleProject2);
    UI.render();
  }

  static cacheDOM() {
    this.addProjectBtn = document.querySelector("#add-project-btn");
    this.projectDialog = document.querySelector("#add-project-dialog");
    this.closeBtn = document.querySelector("#project-dialog-close");
    this.projectForm = document.querySelector("#add-project-form");
    this.projectContainer = document.querySelector(".project-container");
    this.deleteProjectBtn = document.querySelector("#delete-project-btn");
  }

  static bindEventHandler() {
    // Open Form to add project
    this.addProjectBtn.addEventListener("click", UI.openModal.bind(this));

    // Close Form
    this.closeBtn.addEventListener("click", UI.closeModal.bind(this));

    // Add a new project
    this.projectForm.addEventListener("submit", UI.addNewProject.bind(this));

    // Delete project
    document.addEventListener("click", function (e) {
      const target = e.target.closest("#delete-project-btn");

      if (target) {
        UI.deleteProject(target);
      }
    });
  }

  static openModal() {
    this.projectDialog.showModal();
  }

  static closeModal() {
    this.projectDialog.close();
    this.projectForm.reset();
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
    console.log(UI.projectArray);
  }

  static createProjectDiv(name, color) {
    const projectItem = document.createElement("div");
    const projectName = document.createElement("div");
    const deleteBtn = document.createElement("button");

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
    console.log(UI.projectArray);
  }
}
