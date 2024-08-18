import TodoList from "./TodoList";

export default class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.rendered = false;
    this.toDoList = new TodoList();
  }

  // Use this function after rendering.
  render() {
    this.rendered = true;
  }
}
