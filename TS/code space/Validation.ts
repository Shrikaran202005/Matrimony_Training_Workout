// Validation.ts (Exporting module)


// Email Validation
export default function isValidEmail(email: string): boolean {
  const emailRegex :RegExp= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// Password Strength Validation (At least 8 characters, 1 uppercase, 1 number, 1 special character)
export  function isStrongPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
