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

  getTaskName() {
    const newList = [];
    this.taskArray.forEach((task) => {
      newList.push(task.title);
    });
    return newList;
  }
}

export function createTodoList() {
  return new TodoList();
}
