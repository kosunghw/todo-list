import { compareAsc, format } from "date-fns";

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

  sortByDueDate() {
    this.taskArray.sort(compareDueDates);
  }

  filterBySeven() {
    this.taskArray = this.taskArray.filter((element) => {
      const today = new Date();
      const sevenDay = today.setDate(today.getDate() + 7); // Next 7 day in Date object format
      const sevenDayStr = format(sevenDay, "yyMMdd"); // in format of 'yymmdd' (240831)
      console.log(sevenDayStr);
      const taskDueDate = format(element.dueDate, "yyMMdd");
      console.log(taskDueDate);
      const dayDiff = sevenDayStr - taskDueDate;
      console.log(dayDiff);
      return 0 <= dayDiff && dayDiff <= 7;
    });
  }
}

function compareDueDates(task1, task2) {
  return compareAsc(task1.dueDate, task2.dueDate);
}
