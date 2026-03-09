import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProject, deleteProject } from '../store/projectsSlice';
import { Status } from '../types';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

const ProjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.items);
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', color: COLORS[0] });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    dispatch(addProject(form));
    setForm({ name: '', description: '', color: COLORS[0] });
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">{projects.length} projects</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const done = projectTasks.filter((t) => t.status === Status.Done).length;
          const inProgress = projectTasks.filter((t) => t.status === Status.InProgress).length;
          const todo = projectTasks.filter((t) => t.status === Status.Todo).length;
          const progress = projectTasks.length > 0 ? Math.round((done / projectTasks.length) * 100) : 0;

          return (
            <div key={project.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: project.color }}>
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    <p className="text-gray-500 text-sm">{project.description}</p>
                  </div>
                </div>
                <button onClick={() => dispatch(deleteProject(project.id))} className="text-gray-300 hover:text-red-400 transition-colors text-lg">🗑️</button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: project.color }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'To Do', value: todo, color: 'bg-gray-50 text-gray-600' },
                  { label: 'In Progress', value: inProgress, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Done', value: done, color: 'bg-green-50 text-green-600' },
                ].map((s) => (
                  <div key={s.label} className={`${s.color} rounded-xl p-2`}>
                    <div className="font-bold text-lg">{s.value}</div>
                    <div className="text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">New Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Project Color</label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;