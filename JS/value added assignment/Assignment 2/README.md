# Event Booking Analytics Engine - EventSphere

## Project Overview
The **Event Booking Analytics Engine** is a robust JavaScript-based system developed for *EventSphere* to manage, validate, process, and analyze online and offline event bookings. This project resolves legacy calculation and data mutation bugs, implements comprehensive reporting features, and adheres to strict modular refactoring standards.

## Features Implemented
* **Event Revenue Report (Requirement 1):** Accurately calculates and outputs total revenue per event based on tickets sold and ticket prices (`tickets × ticketPrice`).
* **Top Revenue Event (Requirement 2):** Identifies and returns the event generating the highest overall revenue.
* **Attendance Percentage (Requirement 3):** Computes overall event attendance ratio rounded to two decimal places.
* **Customer Spending Report (Requirement 4):** Aggregates and displays total spending per customer.
* **VIP Customers Identification (Requirement 5):** Filters and displays customers whose cumulative spending is $\ge 1500$.
* **Booking Validation (Requirement 6):** Validates incoming booking objects and catches all validation errors (such as missing names, negative ticket counts, or null prices).
* **Analytics Dashboard Object (Requirement 7):** Compiles all system metrics, attendance rates, top revenue events, and VIP customer lists into a unified summary dashboard.
* **Modular Refactoring (Bonus Requirement):** Restructured into pure, standalone functions with zero code duplication (`generateRevenueReport`, `generateAttendanceReport`, `generateVipCustomers`, `generateDashboard`, `validateBooking`).

## Bugs Fixed
* **Bug 1 (Revenue Calculation):** Fixed `calculateRevenue` which previously only summed base ticket prices instead of multiplying by ticket quantities.
* **Bug 2 (Data Mutation during Filtering):** Fixed `getAttendees` which incorrectly used an assignment operator (`=`) instead of a strict comparison operator (`===`) inside filter conditions.
* **Bug 3 (Object Aggregation / NaN):** Fixed `getPopularEvent` aggregation errors by implementing safe key initialization (`|| 0`) to prevent `NaN` arithmetic outcomes.

## How To Execute
1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Open your terminal or command prompt in your project folder.
3. Run the following command:
   ```bash
   node booking-analytics.js
## Sample Output
 Requirement 1: Event Revenue Report 
Angular Summit : 2500
NodeJS Bootcamp : 700
React Conference : 2400

 Requirement 2: Top Revenue Event 
Top Revenue Event:Angular Summit
Revenue: 2500

 Requirement 3: Attendance Percentage 
Attendance Percentage: 75%

 Requirement 4: Customer Spending Report 
Rahul : 1000
Priya : 700
Arun : 1500
Divya : 2400

 Requirement 5: VIP Customers 
Arun
Divya

 Requirement 6: Booking Validation Test 
{
  isValid: false,
  errors: [
    'Customer Name Required',
    'Invalid Ticket Count',
    'Ticket Price Required'
  ]
}

 Requirement 7: Analytics Dashboard Object 
{
  totalRevenue: 5600,
  totalBookings: 4,
  totalAttendees: 3,
  attendancePercentage: 75,
  topRevenueEvent: 'Angular Summit',
  vipCustomers: [ 'Arun', 'Divya' ]
}