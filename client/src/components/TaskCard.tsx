// TaskCard Component - Displays individual task information

import React from 'react';
import { Task, Priority, Status } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    [Priority.Low]: 'bg-green-100 text-green-800 border-green-200',
    [Priority.Medium]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [Priority.High]: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusColors = {
    [Status.Todo]: 'bg-gray-100 text-gray-800',
    [Status.InProgress]: 'bg-blue-100 text-blue-800',
    [Status.Done]: 'bg-green-100 text-green-800',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== Status.Done;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      isOverdue ? 'border-l-red-500' : 'border-l-blue-500'
    } hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          priorityColors[task.priority]
        }`}>
          {Priority[task.priority]}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, Number(e.target.value) as Status)}
            className={`text-xs px-2 py-1 rounded ${
              statusColors[task.status]
            } border-0 cursor-pointer`}
          >
            <option value={Status.Todo}>To Do</option>
            <option value={Status.InProgress}>In Progress</option>
            <option value={Status.Done}>Done</option>
          </select>

          <span className={`text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            Due: {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;