import { format } from "date-fns";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

const UI = function () {
  const exampleProject1 = new Project("Study", "black");
  const exampleProject2 = new Project("Work", "red");
  const projectList = [exampleProject1, exampleProject2];

  // cache DOM
  const addProjectBtn = document.querySelector("#add-project-btn");
  const projectDialog = document.querySelector("#add-project-dialog");
  const closeBtn = document.querySelector("#project-dialog-close");
  const projectForm = document.querySelector("#add-project-form");
  const projectContainer = document.querySelector(".project-container");

  // bind events
  addProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    projectDialog.close();
    projectForm.reset();
  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#project-name").value;
    const color = document.querySelector("#project-color").value;
    const newProject = new Project(name, color);
    console.log(projectList);
    projectList.push(newProject);
    console.log(projectList);
    projectDialog.close();
    projectForm.reset();

    render();
  });
  render();

  // functions
  function render() {
    console.log("Hi, I'm in render function!");
    clearProjects();
    projectList.forEach((project) => {
      const name = project.name;
      const color = project.color;
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-container-item");
      projectItem.innerHTML = `<span class="${color}"></span> ${name}`;
      projectContainer.appendChild(projectItem);
    });
  }

  function clearProjects() {
    projectContainer.innerHTML = `<div class="project-container-title">
            <div id="projects">My projects</div>
            <button id="add-project-btn"><span class="icon"></span></button>
          </div>`;
  }

  //   render();
};

// export default class UI {
//   static init() {
//     this.projectList = new Array();
//     UI.cacheDOM();
//     UI.createEventListeners();
//   }

//   static cacheDOM() {
//     this.addProjectBtn = document.querySelector("#add-project-btn");
//     this.projectDialog = document.querySelector("#add-project-dialog");
//     this.closeBtn = document.querySelector("#project-dialog-close");
//     this.projectForm = document.querySelector("#add-project-form");
//     this.projectContainer = document.querySelector(".project-container");
//   }

//   static createEventListeners() {
//     // Pop up modal
//     this.addProjectBtn.addEventListener("click", () => {
//       this.projectDialog.showModal();
//     });

//     // Close modal
//     this.closeBtn.addEventListener("click", () => {
//       this.projectDialog.close();
//       this.projectForm.reset();
//     });

//     //
//     this.projectForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const name = document.querySelector("#project-name").value;
//       const color = document.querySelector("#project-color").value;
//       const newProject = new Project(name, color);
//       console.log(this.projectList);
//       //   this.projectList.push(newProject);
//       this.projectDialog.close();
//       this.projectForm.reset();

//       UI.render();
//     });
//   }

//   static render() {
//     console.log("Hello, I'm in");
//   }
// }

export default UI;
