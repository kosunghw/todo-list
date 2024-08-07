export default class TodoList {
  constructor() {
    this.taskArray = new Array();
  }

  appendTask(task) {
    this.taskArray.push(task);
  }
}
