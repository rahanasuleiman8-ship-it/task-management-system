export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum Status {
  Todo = 0,
  InProgress = 1,
  Done = 2,
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}