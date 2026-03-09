import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addTask, updateTask, deleteTask, updateStatus } from '../store/tasksSlice';
import TaskCard from '../components/TaskCard';
import { Task, Priority, Status } from '../types';

const emptyTask: Omit<Task, 'id'> = {
  title: '',
  description: '',
  priority: Priority.Medium,
  status: Status.Todo,
  dueDate: new Date().toISOString().split('T')[0],
  projectId: 1,
};

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const projects = useSelector((state: RootState) => state.projects.items);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form, setForm] = useState<Omit<Task, 'id'>>(emptyTask);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = tasks.filter((t) => {
    const matchStatus = filterStatus === 'all' || t.status === Number(filterStatus);
    const matchPriority = filterPriority === 'all' || t.priority === Number(filterPriority);
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  const openAdd = () => { setEditingTask(null); setForm(emptyTask); setShowModal(true); };
  const openEdit = (task: Task) => { setEditingTask(task); setForm({ title: task.title, description: task.description, priority: task.priority, status: task.status, dueDate: task.dueDate, projectId: task.projectId }); setShowModal(true); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingTask) {
      dispatch(updateTask({ ...form, id: editingTask.id }));
    } else {
      dispatch(addTask(form));
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">{filtered.length} of {tasks.length} tasks</p>
        </div>
        <button onClick={openAdd} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          + New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="all">All Status</option>
          <option value="0">To Do</option>
          <option value="1">In Progress</option>
          <option value="2">Done</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="all">All Priority</option>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEdit}
            onDelete={(id) => dispatch(deleteTask(id))}
            onStatusChange={(id, status) => dispatch(updateStatus({ id, status }))}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg">No tasks found</p>
            <button onClick={openAdd} className="mt-4 text-indigo-600 hover:underline">Create your first task</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{editingTask ? 'Edit Task' : 'New Task'}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) as Priority })} className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value={Priority.Low}>Low Priority</option>
                  <option value={Priority.Medium}>Medium Priority</option>
                  <option value={Priority.High}>High Priority</option>
                </select>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: Number(e.target.value) as Status })} className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option value={Status.Todo}>To Do</option>
                  <option value={Status.InProgress}>In Progress</option>
                  <option value={Status.Done}>Done</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Project</label>
                  <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: Number(e.target.value) })} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                {editingTask ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;