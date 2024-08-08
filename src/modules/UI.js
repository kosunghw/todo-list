import { format } from "date-fns";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class UI {
  static init() {
    UI.cacheDOM();
    UI.render();
  }

  static cacheDOM() {
    this.addProjectBtn = document.querySelector("#add-project-btn");
    this.projectDialog = document.querySelector("#add-project-dialog");
    this.closeBtn = document.querySelector("#project-dialog-close");
    this.projectForm = document.querySelector("#add-project-form");
    this.projectContainer = document.querySelector(".project-container");
  }

  static render() {
    this.addProjectBtn.addEventListener("click", () => {
      this.projectDialog.showModal();
    });

    this.projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#project-name").value;
      const color = document.querySelector("#project-color").value;
      const newProject = new Project(name, color);
      const div = document.createElement("div");
      div.classList.add("project-container-item");
      div.innerHTML = `<span class=${color}></span> ${name}`;
      this.projectContainer.appendChild(div);
      this.projectDialog.close();
      this.projectForm.reset();
    });
  }
}
