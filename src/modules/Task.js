import { format } from "date-fns";

export default class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "MMM do yyyy");
    this.priority = priority;
    this.completed = false;
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }

  editDescription(newDescription) {
    this.description = newDescription;
  }

  editDueDate(newDate) {
    this.dueDate = newDate;
  }

  editPriority(newPriority) {
    this.priority = newPriority;
  }

  checkCompleted() {
    this.completed = !this.completed;
  }
}

export function createTask(title, description, dueDate, priority) {
  return new Task(title, description, dueDate, priority);
}
