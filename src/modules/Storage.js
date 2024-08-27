import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

export default class Storage {
  // return true if storage exists, and return false otherwise
  static checkStorage() {
    return localStorage.length !== 0;
  }

  static getProjects(array) {
    for (let i = 0; i < localStorage.length; i++) {
      const project = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const newTodo = new TodoList();
      for (let index = 0; index < project.toDoList.taskArray.length; index++) {
        let task = project.toDoList.taskArray[index];
        const newTask = new Task(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.project,
          task.completed
        );
        newTodo.appendTask(newTask);
      }
      const newProject = new Project(
        project.name,
        project.color,
        false,
        newTodo
      );
      array.push(newProject);
    }
  }

  static setProjectToStorage(project) {
    localStorage.setItem(project.name, JSON.stringify(project));
  }

  static setTaskToStorage(task) {
    for (let i = 0; i < localStorage.length; i++) {
      let project = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (task.project === project.name) {
        const newTodo = new TodoList();
        for (
          let index = 0;
          index < project.toDoList.taskArray.length;
          index++
        ) {
          newTodo.appendTask(project.toDoList.taskArray[index]);
        }
        newTodo.appendTask(task);
        project.toDoList = newTodo;
        localStorage.setItem(project.name, JSON.stringify(project));
      }
    }
  }

  static deleteProjectFromStorage(project) {
    localStorage.removeItem(project.name);
  }

  static deleteTaskFromStorage(task, todo) {
    for (let i = 0; i < localStorage.length; i++) {
      let project = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (task.project === project.name) {
        project.toDoList = todo;
        localStorage.setItem(project.name, JSON.stringify(project));
      }
    }
  }
}
