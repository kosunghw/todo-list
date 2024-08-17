export default class TodoList {
  constructor() {
    this.taskArray = new Array();
  }

  appendTask(task) {
    this.taskArray.push(task);
  }

  deleteTask(taskTitle) {
    this.taskArray = this.taskArray.filter((task) => task.title !== taskTitle);
  }

  get list() {
    return this.taskArray;
  }

  get length() {
    return this.taskArray.length;
  }
}

export function createTodoList() {
  return new TodoList();
}
