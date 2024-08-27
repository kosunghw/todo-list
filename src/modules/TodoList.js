import { compareAsc, differenceInDays } from "date-fns";

export default class TodoList {
  constructor() {
    this.taskArray = new Array();
  }

  appendTask(task) {
    this.taskArray.push(task);
  }

  deleteTask(taskTitle) {
    this.taskArray = this.taskArray.filter((task) => {
      return task.title !== taskTitle;
    });
  }

  get list() {
    return this.taskArray;
  }

  get length() {
    return this.taskArray.length;
  }

  empty() {
    this.taskArray = [];
  }

  getTaskName() {
    const newList = [];
    this.taskArray.forEach((task) => {
      newList.push(task.title);
    });
    return newList;
  }

  sortByDueDate() {
    this.taskArray.sort(compareDueDates);
  }

  filterBySeven() {
    this.taskArray = this.taskArray.filter((element) => {
      const today = new Date();
      const dayDiff = differenceInDays(element.dueDate, today);
      return 0 <= dayDiff && dayDiff <= 7;
    });
  }

  filterByToday() {
    this.taskArray = this.taskArray.filter((element) => {
      const today = new Date();
      const dayDiff = differenceInDays(element.dueDate, today);
      return 0 === dayDiff;
    });
  }
}

function compareDueDates(task1, task2) {
  return compareAsc(task1.dueDate, task2.dueDate);
}
