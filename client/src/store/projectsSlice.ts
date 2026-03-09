import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types';

const defaultProjects: Project[] = [
  { id: 1, name: 'Task Management System', description: 'Full-stack app with ASP.NET Core + React', color: '#6366f1' },
  { id: 2, name: 'Personal Portfolio', description: 'My developer portfolio and projects showcase', color: '#10b981' },
  { id: 3, name: 'E-Commerce Platform', description: 'Online store with product catalog and cart', color: '#f59e0b' },
];

const saved = localStorage.getItem('projects');

interface ProjectsState {
  items: Project[];
  nextId: number;
}

const initialState: ProjectsState = {
  items: saved ? JSON.parse(saved) : defaultProjects,
  nextId: saved ? Math.max(...JSON.parse(saved).map((p: Project) => p.id)) + 1 : 4,
};

const save = (projects: Project[]) => localStorage.setItem('projects', JSON.stringify(projects));

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Omit<Project, 'id'>>) => {
      const project = { ...action.payload, id: state.nextId++ };
      state.items.push(project);
      save(state.items);
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      save(state.items);
    },
  },
});

export const { addProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;