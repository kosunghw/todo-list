import TodoList, { createTodoList } from "./TodoList";

export default class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.rendered = false;
    this.toDoList = createTodoList();
  }

  // Use this function after rendering.
  render() {
    this.rendered = true;
  }
}

export function createProject(name, color) {
  return new Project(name, color);
}
