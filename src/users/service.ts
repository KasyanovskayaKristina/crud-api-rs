import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

export function getUsers(): User[] {
  return users;
}

export function getUserById(userId: string): User | undefined {
  return users.find((u) => u.id === userId);
}

export function createUser(
  username: string,
  age: number,
  hobbies: string[]
): User {
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };
  users.push(newUser);
  return newUser;
}

export function updateUser(
  userId: string,
  username: string,
  age: number,
  hobbies: string[]
): User | undefined {
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    const updatedUser: User = {
      id: users[index]!.id,
      username,
      age,
      hobbies: hobbies || [],
    };
    users[index] = updatedUser;
    return updatedUser;
  }
  return undefined;
}

export function deleteUser(userId: string): void {
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
  }
}
