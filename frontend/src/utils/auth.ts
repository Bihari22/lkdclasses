export type User = {
  role: "student" | "admin";
  name?: string;
  roll?: string;
};

let currentUser: User | null = null;

export function setUser(user: User) {
  currentUser = user;
}

export function getUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}
