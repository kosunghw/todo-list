import Task from "./modules/Task";

const task1 = new Task("Hello", "descriptive", "2024/08/08", "priority1");
console.log(task1.completed);
task1.checkCompleted();
console.log(task1.completed);
