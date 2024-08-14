import TodoList, { createTodoList } from "./TodoList";

export default class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.toDoList = createTodoList();
  }
}

export function createProject(name, color) {
  return new Project(name, color);
}
