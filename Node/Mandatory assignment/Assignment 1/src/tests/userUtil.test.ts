import {
  getUserFullName,
  isValidEmail,
  getActiveUsers,
  getUserById,
  User
} from "../userUtil";

describe("User Utility Tests", () => {

  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@test.com", isActive: true },
    { id: 2, name: "Bob", email: "bob@test.com", isActive: false },
    { id: 3, name: "Charlie", email: "charlie@test.com", isActive: true }
  ];

  // 1. Full name tests
  test("should format user full name to uppercase", () => {
    expect(getUserFullName("john doe")).toBe("JOHN DOE");
    expect(getUserFullName("ALICE")).toBe("ALICE");
  });

  test("should remove extra spaces", () => {
    expect(getUserFullName("  alice  ")).toBe("ALICE");
  });

  test("should handle empty strings", () => {
    expect(getUserFullName("")).toBe("");
  });

  test("should handle whitespace-only strings", () => {
    expect(getUserFullName("   ")).toBe("");
  });

  test("should preserve internal spaces", () => {
    expect(getUserFullName("john  doe")).toBe("JOHN  DOE");
  });

  // 2. Email validation tests
  test("should accept a valid email", () => {
    expect(isValidEmail("alice@test.com")).toBe(true);
  });

  test("should reject email without @", () => {
    expect(isValidEmail("alicetest.com")).toBe(false);
  });

  test("should reject email without dot", () => {
    expect(isValidEmail("alice@testcom")).toBe(false);
  });

  test("should reject empty email", () => {
    expect(isValidEmail("")).toBe(false);
  });

  test("should accept email with both required characters", () => {
    expect(isValidEmail("a@b.c")).toBe(true);
  });

  // 3. Active users tests
  test("should return only active users", () => {
    expect(getActiveUsers(users)).toEqual([
      { id: 1, name: "Alice", email: "alice@test.com", isActive: true },
      { id: 3, name: "Charlie", email: "charlie@test.com", isActive: true }
    ]);
  });

  test("should include active user and exclude inactive users", () => {
    const active = getActiveUsers(users);
    expect(active).toContain(users[0]);
    expect(active).not.toContain(users[1]);
  });

  test("should return empty array when all users are inactive", () => {
    expect(getActiveUsers([users[1]])).toEqual([]);
  });

  test("should return all users when all are active", () => {
    expect(getActiveUsers([users[0], users[2]])).toEqual([
      { id: 1, name: "Alice", email: "alice@test.com", isActive: true },
      { id: 3, name: "Charlie", email: "charlie@test.com", isActive: true }
    ]);
  });

  test("should handle empty user array", () => {
    expect(getActiveUsers([])).toEqual([]);
  });

  // 4. Get user by ID tests
  test("should find user by valid ID", () => {
    expect(getUserById(users, 1)).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@test.com",
      isActive: true
    });
  });

  test("should find inactive user by ID", () => {
    expect(getUserById(users, 2)).toEqual({
      id: 2,
      name: "Bob",
      email: "bob@test.com",
      isActive: false
    });
  });

  test("should return undefined for unknown ID", () => {
    expect(getUserById(users, 99)).toBeUndefined();
  });

  test("should return undefined for negative ID", () => {
    expect(getUserById(users, -1)).toBeUndefined();
  });

  test("should handle empty user array", () => {
    expect(getUserById([], 1)).toBeUndefined();
  });

  test("should distinguish numeric IDs", () => {
    expect(getUserById(users, 3)).toEqual({
      id: 3,
      name: "Charlie",
      email: "charlie@test.com",
      isActive: true
    });
  });

});