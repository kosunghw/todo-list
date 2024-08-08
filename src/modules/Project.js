import TodoList from "./TodoList";

class Project {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.toDoList = new TodoList();
  }
}

export default Project;
