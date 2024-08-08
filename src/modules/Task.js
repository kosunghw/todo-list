class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
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

export default Task;
