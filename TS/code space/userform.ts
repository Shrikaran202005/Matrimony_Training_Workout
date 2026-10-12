// main.ts (Importing module)


import isValidEmail, { isStrongPassword } from "./Validation"; // default and named import

 //named import
// Sample Data
const email = "test@example.com";
const password = "Strong@123";


// Validation Checks
console.log(`Is "${email}" a valid email?`, isValidEmail(email)); // ✅ true
console.log(`Is "${password}" a strong password?`, isStrongPassword(password)); // ✅ true


// Invalid Cases
console.log(`Is "invalid-email" a valid email?`, isValidEmail("invalid-email")); // ❌ false
console.log(`Is "weakpass" a strong password?`, isStrongPassword("weakpass")); // ❌ false


