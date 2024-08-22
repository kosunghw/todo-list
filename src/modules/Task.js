import { format } from "date-fns";

export default class Task {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = false;
  }

  editTask(newTitle, newDescription, newDueDate, newPriority, newProject) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
    this.project = newProject;
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

export function createTask(title, description, dueDate, priority, project) {
  return new Task(title, description, dueDate, priority, project);
}
