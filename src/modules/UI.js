import { format } from "date-fns";
import Project, { createProject } from "./Project";
import Task from "./Task";
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
    if (UI.projectArray.some((project) => project.name === name)) {
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

// const UI = function () {
//   const exampleProject1 = new Project("Study", "black");
//   const exampleProject2 = new Project("Work", "red");
//   const projectList = [exampleProject1, exampleProject2];

//   // cache DOM
//   const addProjectBtn = document.querySelector("#add-project-btn");
//   const projectDialog = document.querySelector("#add-project-dialog");
//   const closeBtn = document.querySelector("#project-dialog-close");
//   const projectForm = document.querySelector("#add-project-form");
//   const projectContainer = document.querySelector(".project-container");

//   // bind events
//   addProjectBtn.addEventListener("click", () => {
//     projectDialog.showModal();
//   });

//   closeBtn.addEventListener("click", () => {
//     projectDialog.close();
//     projectForm.reset();
//   });

//   // render();

//   projectForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const name = document.querySelector("#project-name").value;
//     const color = document.querySelector("#project-color").value;
//     const newProject = new Project(name, color);
//     console.log(projectList);
//     projectList.push(newProject);
//     console.log(projectList);
//     projectDialog.close();
//     projectForm.reset();

//     render();
//   });

//   // functions
//   function render() {
//     console.log("Hi, I'm in render function!");
//     clearProjects();
//     projectList.forEach((project) => {
//       const name = project.name;
//       const color = project.color;
//       const projectItem = document.createElement("div");
//       projectItem.classList.add("project-container-item");
//       projectItem.innerHTML = `<span class="${color}"></span> ${name}`;
//       projectContainer.appendChild(projectItem);
//     });
//   }

//   function clearProjects() {
//     projectContainer.innerHTML = `<div class="project-container-title">
//             <div id="projects">My projects</div>
//             <button id="add-project-btn"><span class="icon"></span></button>
//           </div>`;
//   }

//   render();
// };

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
