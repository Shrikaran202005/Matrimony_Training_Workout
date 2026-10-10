# Training Management System - TypeScript Assignment

## Project Overview
This project enhances the LearnHub training platform. It debugs existing Stack and Queue modules and implements new features, including a Binary Search for trainee data and a Tree Data Structure for learning paths.

## Bugs Identified
1. **Stack Pop:** Strict return type mismatch causing potential undefined errors.
2. **Queue Dequeue:** Strict return type mismatch causing potential undefined errors.
3. **Type Mismatch:** String concatenation occurred where mathematical addition was expected for `traineeId`.

## Fixes Applied
- Updated return types on `.pop()` and `.dequeue()` to explicitly include `undefined`.
- Applied type guards (null checks) before calling string methods on popped/dequeued items.
- Corrected the `traineeId` type from string to number.

## Features Implemented
- **Binary Search:** Implemented `searchTraineeById` to efficiently find trainees in an ascending-sorted array.
- **Tree Data Structure:** Modeled a hierarchical learning path using `LearningPathNode` interfaces.
- **Preorder Traversal:** Created recursive traversal functions to display full learning paths and targeted learning path reports.

## How To Execute
1. Open terminal in the project directory.
2. Compile the TypeScript file: `tsc training-management-system.ts`
3. Run the compiled JavaScript: `node training-management-system.js`

## Sample Output
--- Stack Module ---
Current Course: JAVASCRIPT

--- Queue Module ---
Current Doubt: Angular Routing

--- Trainee ID Math ---
112

--- Binary Search Output ---
{ traineeId: 103, name: 'Arun' }
null

--- Tree Traversal ---
Programming
Frontend
HTML
CSS
JavaScript
TypeScript
Angular
Backend
Node.js
Express.js

--- Learning Path Report ---
Frontend Courses
HTML
CSS
JavaScript
TypeScript
Angular
Backend Courses
Node.js
Express.js