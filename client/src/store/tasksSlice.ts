import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Priority, Status } from '../types';

const defaultTasks: Task[] = [
  { id: 1, title: 'Set up project structure', description: 'Initialize React + TypeScript project with all dependencies', priority: Priority.High, status: Status.Done, dueDate: '2026-01-10', projectId: 1 },
  { id: 2, title: 'Design database schema', description: 'Create ERD and define all tables for the task management system', priority: Priority.High, status: Status.Done, dueDate: '2026-01-15', projectId: 1 },
  { id: 3, title: 'Build REST API endpoints', description: 'Implement CRUD operations for tasks and projects using ASP.NET Core', priority: Priority.High, status: Status.InProgress, dueDate: '2026-02-01', projectId: 1 },
  { id: 4, title: 'Implement JWT authentication', description: 'Add secure login/register with JWT tokens', priority: Priority.Medium, status: Status.InProgress, dueDate: '2026-02-05', projectId: 1 },
  { id: 5, title: 'Create dashboard UI', description: 'Build the main dashboard with task statistics and overview', priority: Priority.Medium, status: Status.Todo, dueDate: '2026-02-15', projectId: 2 },
  { id: 6, title: 'Add drag-and-drop', description: 'Implement kanban-style drag and drop for task status updates', priority: Priority.Low, status: Status.Todo, dueDate: '2026-03-01', projectId: 2 },
  { id: 7, title: 'Write unit tests', description: 'Add test coverage for API controllers and React components', priority: Priority.Medium, status: Status.Todo, dueDate: '2026-03-10', projectId: 1 },
  { id: 8, title: 'Deploy to production', description: 'Set up CI/CD pipeline and deploy to Vercel + Railway', priority: Priority.High, status: Status.Todo, dueDate: '2026-03-20', projectId: 2 },
];

const savedTasks = localStorage.getItem('tasks');

interface TasksState {
  items: Task[];
  nextId: number;
}

const initialState: TasksState = {
  items: savedTasks ? JSON.parse(savedTasks) : defaultTasks,
  nextId: savedTasks ? Math.max(...JSON.parse(savedTasks).map((t: Task) => t.id)) + 1 : 9,
};

const save = (tasks: Task[]) => localStorage.setItem('tasks', JSON.stringify(tasks));

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const task = { ...action.payload, id: state.nextId++ };
      state.items.push(task);
      save(state.items);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) { state.items[idx] = action.payload; save(state.items); }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      save(state.items);
    },
    updateStatus: (state, action: PayloadAction<{ id: number; status: Status }>) => {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) { task.status = action.payload.status; save(state.items); }
    },
  },
});

export const { addTask, updateTask, deleteTask, updateStatus } = tasksSlice.actions;
export default tasksSlice.reducer;