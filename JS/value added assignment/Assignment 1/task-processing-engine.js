// Existing Dataset 
const tasks = [
  {
    taskId: 101,
    employee: "Rahul",
    taskName: "Create Login Module",
    status: "Pending",
    priority: "High"
  },
  {
    taskId: 102,
    employee: "Priya",
    taskName: "Design Dashboard",
    status: "Completed",
    priority: "Medium"
  },
  {
    taskId: 103,
    employee: "Arun",
    taskName: "API Integration",
    status: "Pending",
    priority: "High"
  }
];

// Requirement 1 & 2
const processTasks = (tasks, callback) => {
  for (let task of tasks) {
    callback(task);
  }
};


const displayTask = (task) => {
  console.log(`${task.taskName} - ${task.status}`);
};

// Requirement 5
const displayPriority = (task) => {
  console.log(`${task.priority} Priority`);
};

// Requirement 6
const displayStatus = (task) => {
  console.log(`${task.status}`);
};

const displayEmployee = (task) => {
  console.log(`${task.employee}: ${task.taskName}`);
};


// Requirement 3
const createTaskIterator = (tasks) => {
  let index = 0;
  const labels = ["First Task", "Second Task", "Third Task"];
  return {
    next: () => {
      if (index < tasks.length) {
        console.log(labels[index]);
        const result = { value: tasks[index], done: false };
        index++;
        return result;
      } else {
        return { value: undefined, done: true };
      }
    }
  };
};


// Requirement 4
const createTaskCounter = () => {
  let count = 0;
  return () => {
    count++;
    console.log(`Processed Tasks: ${count}`);
    return count;
  };
};


// Requirement 7
const generateTaskSummary = (tasks) => {
  return {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === "Completed").length,
    pendingTasks: tasks.filter(t => t.status === "Pending").length,
    highPriorityTasks: tasks.filter(t => t.priority === "High").length
  };
};

// Requirement 8
function* taskGenerator(tasks) {
  for (let task of tasks) {
    yield task;
  }
}

// Bonus Requirement
const generateTaskReport = (tasks, callback) => {
  console.log("=== STARTING TASK REPORT ===");
  processTasks(tasks, callback);
  console.log("=== END OF REPORT ===\n");
};

// Execution / Demonstration Script
console.log(" 1. Basic Process Tasks with Display Task Callback ");
processTasks(tasks, displayTask);

console.log("\n 2. Requirement 5: Priority Callback Output ");
processTasks(tasks, displayPriority);

console.log("\n 3. Requirement 6: Status Callback Output ");
processTasks(tasks, displayStatus);

console.log("\n 4. Requirement 3: Custom Iterator Test ");
const iterator = createTaskIterator(tasks);
iterator.next();
iterator.next();
iterator.next();

console.log("\n 5. Requirement 4: Task Counter Using Closure Test ");
const counter = createTaskCounter();
counter();
counter();
counter();

console.log("\n 6. Requirement 7: Task Summary Generator Output ");
console.log(generateTaskSummary(tasks));

console.log("\n 7. Requirement 8: Generator Function Test ");
const generator = taskGenerator(tasks);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);

console.log("\n 8. Bonus Requirement: Generic Reporting Engine Test ");
generateTaskReport(tasks, displayStatus);
generateTaskReport(tasks, displayPriority);