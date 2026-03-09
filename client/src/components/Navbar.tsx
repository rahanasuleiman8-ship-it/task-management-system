import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          ✅ TaskFlow
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors text-sm font-medium">Dashboard</Link>
          <Link to="/tasks" className="hover:text-indigo-200 transition-colors text-sm font-medium">Tasks</Link>
          <Link to="/projects" className="hover:text-indigo-200 transition-colors text-sm font-medium">Projects</Link>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-indigo-500">
            <span className="text-sm text-indigo-200">👤 {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;