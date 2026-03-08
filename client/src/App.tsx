// Task Management System - React Frontend
// Main Application Component

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import ProjectList from './pages/ProjectList';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/" /> : <Register />
            } />

            {/* Protected Routes */}
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/tasks" element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            } />
            <Route path="/projects" element={
              <PrivateRoute>
                <ProjectList />
              </PrivateRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;