# AI Prompt for Password Reset Feature

Act as a senior TypeScript developer. I need to add a secure password reset feature to an existing authentication system.

Here is the existing context:
- We use strict TypeScript, `async/await`, and `bcrypt` for hashing.
- We have a `User` interface, `UserService` (handles DB queries), and `AuthService` (handles logic).

Please provide the implementation for `requestPasswordReset` and `resetPassword` in the `AuthService`, and tell me how to update the `User` interface. 

Strict Security & Functional Constraints:
1. The reset token MUST be securely generated.
2. The reset token MUST be hashed using `bcrypt` before saving to the database (never stored in plaintext).
3. The token must expire exactly 1 hour after generation.
4. The token must be single-use (cleared/invalidated after successful password change).
5. Ensure we reject expired or invalid tokens immediately.
6. Return type-safe response objects matching the `{ success: boolean, error?: string }` pattern.