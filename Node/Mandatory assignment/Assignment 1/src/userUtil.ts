
export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export function getUserFullName(name: string): string {
  return name.trim().toUpperCase();
}

export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

export function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}

export function getUserById(users: User[], id: number): User | undefined {
  return users.find(user => user.id === id);
}
