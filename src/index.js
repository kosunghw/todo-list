import Task from "./modules/Task";
import TodoList from "./modules/TodoList";
import Project from "./modules/Project";
import UI from "./modules/UI";

document.addEventListener("DOMContentLoaded", UI);

// const btn = document.querySelector("#add-project-btn");
// const projectDialog = document.querySelector("#add-project-dialog");
// const closeBtn = document.querySelector("#project-dialog-close");
// const projectForm = document.querySelector("#add-project-form");
// const projectContainer = document.querySelector(".project-container");
// btn.addEventListener("click", () => {
//   projectDialog.showModal();
// });

// closeBtn.addEventListener("click", () => {
//   projectDialog.close();
//   projectForm.reset();
// });

// projectForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.querySelector("#project-name").value;
//   const color = document.querySelector("#project-color").value;
//   const newProject = new Project(name, color);
//   const div = document.createElement("div");
//   div.classList.add("project-container-item");
//   div.innerHTML = `<span class=${color}></span> ${name}`;
//   projectContainer.appendChild(div);
//   console.log(newProject);
//   projectDialog.close();
//   projectForm.reset();
// });

// const btn = document.querySelector("button");
// const body = document.querySelector("body");
// const list = document.createElement("ul");
// btn.addEventListener("click", addProject);

// const projects = document.querySelector("#projects");
// function addProject(name, color) {
//   const project = new Project("name", "color");
//   const projectDiv = document.createElement("div");
//   projectDiv.textContent = `${project.name}`;
//   projects.appendChild(projectDiv);
// }
