import TodoList from "./TodoList";

export default class Project {
  constructor(name, color, rendered, toDoList) {
    this.name = name;
    this.color = color;
    this.rendered = rendered;
    this.toDoList = toDoList;
  }

  // Use this function after rendering.
  render() {
    this.rendered = true;
  }
}
