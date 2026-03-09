import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { Status, Priority } from '../types';

const Dashboard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const projects = useSelector((state: RootState) => state.projects.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const todo = tasks.filter((t) => t.status === Status.Todo).length;
  const inProgress = tasks.filter((t) => t.status === Status.InProgress).length;
  const done = tasks.filter((t) => t.status === Status.Done).length;
  const highPriority = tasks.filter((t) => t.priority === Priority.High && t.status !== Status.Done).length;
  const overdue = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== Status.Done).length;

  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);

  const statusLabel = { [Status.Todo]: 'To Do', [Status.InProgress]: 'In Progress', [Status.Done]: 'Done' };
  const statusColor = { [Status.Todo]: 'bg-gray-100 text-gray-700', [Status.InProgress]: 'bg-blue-100 text-blue-700', [Status.Done]: 'bg-green-100 text-green-700' };
  const priorityColor = { [Priority.Low]: 'text-green-600', [Priority.Medium]: 'text-yellow-600', [Priority.High]: 'text-red-600' };
  const priorityLabel = { [Priority.Low]: 'Low', [Priority.Medium]: 'Medium', [Priority.High]: 'High' };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name} 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Tasks', value: tasks.length, color: 'bg-indigo-50 text-indigo-700', icon: '📋' },
          { label: 'To Do', value: todo, color: 'bg-gray-50 text-gray-700', icon: '⏳' },
          { label: 'In Progress', value: inProgress, color: 'bg-blue-50 text-blue-700', icon: '🔄' },
          { label: 'Completed', value: done, color: 'bg-green-50 text-green-700', icon: '✅' },
          { label: 'Overdue', value: overdue, color: 'bg-red-50 text-red-700', icon: '⚠️' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-5 text-center`}>
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Tasks</h2>
            <Link to="/tasks" className="text-indigo-600 hover:underline text-sm">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{task.title}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${priorityColor[task.priority]}`}>
                    {priorityLabel[task.priority]} Priority
                  </p>
                </div>
                <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${statusColor[task.status]}`}>
                  {statusLabel[task.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Projects</h2>
            <Link to="/projects" className="text-indigo-600 hover:underline text-sm">View all →</Link>
          </div>
          <div className="space-y-3">
            {projects.map((project) => {
              const projectTasks = tasks.filter((t) => t.projectId === project.id);
              const projectDone = projectTasks.filter((t) => t.status === Status.Done).length;
              const progress = projectTasks.length > 0 ? Math.round((projectDone / projectTasks.length) * 100) : 0;
              return (
                <div key={project.id} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <p className="font-medium text-gray-800 text-sm">{project.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: project.color }} />
                    </div>
                    <span className="text-xs text-gray-500">{progress}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{projectTasks.length} tasks</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {highPriority > 0 && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-semibold text-red-700">You have {highPriority} high priority task{highPriority > 1 ? 's' : ''} pending</p>
            <Link to="/tasks" className="text-red-600 hover:underline text-sm">View tasks →</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;