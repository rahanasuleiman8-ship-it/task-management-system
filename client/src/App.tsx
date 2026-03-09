import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Lazy load all pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const TaskList = lazy(() => import('./pages/TaskList'));
const ProjectList = lazy(() => import('./pages/ProjectList'));

const PageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
    <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-64" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
      ))}
    </div>
    <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <main>
        <Suspense fallback={<PageSkeleton />}>
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
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/tasks" element={
              <PrivateRoute><TaskList /></PrivateRoute>
            } />
            <Route path="/projects" element={
              <PrivateRoute><ProjectList /></PrivateRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;