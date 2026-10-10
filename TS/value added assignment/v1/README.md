# Employee Management System - Debugging Assignment

## Project Overview
This is a TypeScript-based application for StaffSphere to maintain employee information. This project fixes compilation and runtime errors introduced during a migration from JavaScript to TypeScript.

## Issues Identified
- Type mismatches for Employee IDs (string vs number).
- Unsafe mathematical operations on optional properties (salary).
- Unhandled `undefined` returns from array search methods.
- Method name typos (`toUppercase`).
- Missing null checks before accessing object properties.

## Fixes Applied
- Updated `getEmployeeById` parameter and return types to strictly match the `Employee` interface.
- Added ternary fallback logic in `calculateBonus` to handle missing salaries.
- Corrected string manipulation method names.
- Implemented execution-level type guards (null checks) before accessing fetched employee data.

## Steps To Execute
1. Open the terminal in the project directory.
2. Compile the code: `tsc employee-management.ts`
3. Run the compiled JavaScript: `node employee-management.js`

## Final Output
Engineering
0
RAHUL