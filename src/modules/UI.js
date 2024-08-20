import { format, compareAsc } from "date-fns";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default class UI {
  static projectArray = [];
  static allTaskArray = new TodoList();
  static inboxArray = new TodoList();

  static init() {
    UI.cacheDOM();
    UI.bindEventHandler();
    UI.exampleProjects();
  }

  static exampleProjects() {
    const exampleProject1 = new Project("Study", "black");
    const exampleProject2 = new Project("Grocery Shopping", "red");

    const exampleTask1 = new Task(
      "LeetCode",
      "Solve problems on LeetCode",
      new Date("08-24-2024"),
      "MEDIUM"
    );
    const exampleTask2 = new Task(
      "Todo List",
      "Solve problems on LeetCode",
      new Date("08-19-2024"),
      "MEDIUM"
    );

    const exampleTask3 = new Task(
      "Buy Kitchen Towels",
      "We are out of kitchen towels",
      new Date("08-19-2024"),
      "HIGH"
    );

    UI.allTaskArray.appendTask(exampleTask1);
    UI.allTaskArray.appendTask(exampleTask2);
    UI.allTaskArray.appendTask(exampleTask3);

    exampleProject1.toDoList.appendTask(exampleTask1);
    exampleProject1.toDoList.appendTask(exampleTask2);
    exampleProject2.toDoList.appendTask(exampleTask3);
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

    // Click on inbox
    this.inbox.addEventListener("click", UI.showContent.bind(this));

    // Click on Today
    this.today.addEventListener("click", UI.showContent.bind(this));

    // CLick on Next 7 days
    this.thisWeek.addEventListener("click", UI.showContent.bind(this));

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
      const newProject = new Project(name, color);
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
    const date = document.querySelector("#date").value.split("-"); // ['YYYY', 'MM', 'DD']
    // Reformat dates to get the correct date
    const dueDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
    const priority = document.querySelector("#priority").value.toUpperCase();
    const projectSelected = document.querySelector(
      "#task-project-select"
    ).value;

    const task = new Task(name, description, dueDate, priority);
    if (projectSelected === "inbox") {
      UI.inboxArray.appendTask(task);
      UI.inboxArray.sortByDueDate();
      UI.showInbox();
    } else {
      const project = UI.findProject(projectSelected);
      project.toDoList.appendTask(task);
      UI.showProjectContent(project);
    }
    UI.allTaskArray.appendTask(task);

    this.taskDialog.close();
    this.taskForm.reset();
  }

  static deleteProject(target) {
    const projectName = target.parentNode.children[1].textContent;
    UI.projectArray = UI.projectArray.filter(
      (project) => project.name !== projectName
    );

    target.parentNode.remove();
    UI.deleteProjectOption(projectName);
  }

  // Delete Task
  static deleteTask(target) {
    const taskName = target.nextElementSibling.textContent;
    const projectName = this.contentContainer.children[0].textContent;

    for (let i = 0; i < UI.projectArray.length; i++) {
      let taskNameArray = UI.projectArray[i].toDoList.getTaskName();
      if (taskNameArray.includes(taskName)) {
        UI.projectArray[i].toDoList.deleteTask(taskName);
      }
    }
    UI.allTaskArray.deleteTask(taskName);

    if (projectName === "Inbox") {
      UI.showInbox();
    } else {
      UI.showProjectContent(UI.findProject(projectName));
    }
  }

  static findProject(target) {
    if (target === "inbox" || target === "Inbox") {
      return "inbox";
    } else if (typeof target === "string") {
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
    project.toDoList.sortByDueDate();
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

  static showContent(event) {
    const name = event.currentTarget.textContent;
    this.contentContainer.innerHTML = "";
    const title = document.createElement("h1");
    const taskNumber = document.createElement("div");
    const taskDiv = document.createElement("div");

    title.classList.add("title");
    let taskArray;
    if (name === "Inbox") {
      taskArray = UI.inboxArray;
      title.textContent = "Inbox";
    } else if (name === "Today") {
      taskArray = UI.getTodayTask();
      title.textContent = "Today";
    } else if (name === "Next 7 days") {
      title.textContent = "Next 7 Days";
      taskArray = UI.allTaskArray;
      taskArray.filterBySeven();
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

    this.contentContainer.appendChild(title);
    this.contentContainer.appendChild(taskNumber);
    this.contentContainer.appendChild(taskDiv);
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
    taskDueDate.textContent = format(task.dueDate, "MMM do',' yyyy");
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

  // Returns a list containing tasks that are due TODAY
  static getTodayTask() {
    const date = new Date().getMonth() + new Date().getDate();
    const list = new TodoList();
    for (let i = 0; i < UI.allTaskArray.length; i++) {
      const dueDate =
        UI.allTaskArray.list[i].dueDate.getMonth() +
        UI.allTaskArray.list[i].dueDate.getDate();
      if (date === dueDate) {
        list.appendTask(UI.allTaskArray.list[i]);
      }
    }
    return list;
  }
}
