import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
// import DashboardAdmin from './pages/DashboardAdmin.jsx';
// import DashboardStudent from './pages/DashboardStudent.jsx';
// import DashboardTeacher from './pages/DashboardTeacher.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  const { isAuthenticated, userData } = useAuth() || { isAuthenticated: false, userData: null };
  const userRole = (isAuthenticated) ? userData.role : 'user';
  const dashboard = toDashboard(isAuthenticated, userRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={dashboard.to} />} />
        <Route path='/login' element={isAuthenticated?<Navigate to={dashboard.to} />:<Login />} />
        <Route path='/dashboard-admin' element={isAuthenticated && userRole === 1 ? <DashboardAdmin /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-teacher' element={isAuthenticated && userRole === 2 ? <DashboardTeacher /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-student' element={isAuthenticated && userRole === 3 ? <DashboardStudent /> : <Navigate to={dashboard.to} />} />
      </Routes>
    </BrowserRouter>
  );
};

function toDashboard(isAuthenticated, role) {
  if (isAuthenticated && role === 3) { return { to: '/dashboard-student', dash: <DashboardStudent /> }; }
  if (isAuthenticated && role === 2) { return { to: '/dashboard-teacher', dash: <DashboardTeacher /> }; }
  if (isAuthenticated && role === 1) { return { to: '/dashboard-admin', dash: <DashboardAdmin /> }; }
  
  return { to: '/login', dash: <Login /> };
}

export default App;