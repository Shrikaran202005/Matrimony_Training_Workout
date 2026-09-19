# Task Processing Engine - TaskFlow Solutions

## Project Overview
The **Task Processing Engine** is a robust JavaScript-based system developed for TaskFlow Solutions to manage, process, track, and analyze employee tasks. This project addresses legacy bugs, enhances system maintainability, and implements advanced JavaScript paradigms including callbacks, closures, iterators, and generators.

## Features Implemented
* **Arrow Functions (Requirement 1):** Modernized syntax across all handlers, display formatters, and task processors.
* **Reusable Callback Processor (Requirement 2):** Dynamically executes various operations (status checks, priority evaluation, employee assignment) against the task dataset.
* **Custom Iterator (Requirement 3):** Allows manual, sequential traversal of tasks step-by-step via `.next()`.
* **Stateful Counter Using Closure (Requirement 4):** Uses lexical scoping to keep an internal state tracking processed tasks (e.g., `Processed Tasks: 1`, `2`, `3`).
* **Priority Callback (Requirement 5):** Formats and prints task priorities (e.g., `High Priority`, `Medium Priority`).
* **Status Callback (Requirement 6):** Outputs individual task statuses (e.g., `Pending`, `Completed`).
* **Task Summary Generator (Requirement 7):** Aggregates and returns a performance metrics object (total, completed, pending, and high-priority counts).
* **Generator Function (Requirement 8):** Leverages ES6 generator functions (`function*`) to yield tasks one at a time.
* **Generic Reporting Engine (Bonus Requirement):** A higher-order reporting wrapper capable of producing formatted execution reports for any callback function.

## Bugs Fixed
* **Unsafe Array Iteration:** Replaced the legacy `for...in` loop (which iterates over array keys/indices as strings and risks picking up prototype properties) with a secure, modern **`for...of`** loop to cleanly traverse the task array elements.


## How To Execute
1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Open your terminal or command prompt in your project folder.
3. Run the following command:
   ```bash
   node task-processing-engine.js

## Sample Output
Basic Process Tasks with Display Task Callback 
Create Login Module - Pending
Design Dashboard - Completed
API Integration - Pending

Requirement 5: Priority Callback Output 
High Priority
Medium Priority
High Priority

Requirement 6: Status Callback Output 
Pending
Completed
Pending

Requirement 3: Custom Iterator Test 
First Task
Second Task
Third Task

Requirement 4: Task Counter Using Closure Test 
Processed Tasks: 1
Processed Tasks: 2
Processed Tasks: 3

Requirement 7: Task Summary Generator Output 
{
  totalTasks: 3,
  completedTasks: 1,
  pendingTasks: 2,
  highPriorityTasks: 2
}

Requirement 8: Generator Function Test 
{
  taskId: 101,
  employee: 'Rahul',
  taskName: 'Create Login Module',
  status: 'Pending',
  priority: 'High'
}
{
  taskId: 102,
  employee: 'Priya',
  taskName: 'Design Dashboard',
  status: 'Completed',
  priority: 'Medium'
}
{
  taskId: 103,
  employee: 'Arun',
  taskName: 'API Integration',
  status: 'Pending',
  priority: 'High'
}

Bonus Requirement: Generic Reporting Engine Test 
=== STARTING TASK REPORT ===
Pending
Completed
Pending
=== END OF REPORT ===

=== STARTING TASK REPORT ===
High Priority
Medium Priority
High Priority
=== END OF REPORT ===