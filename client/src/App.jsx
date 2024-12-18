import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import AdminPage from './pages/AdminPage.jsx';
import StudentPage from './pages/StudentPage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import TeacherCourses from './pages/TeacherCourses.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminMajors from './pages/AdminMajors.jsx';
import StudentCourses from './pages/StudentCourses.jsx';
import StudentOpenCourses from './pages/StudentOpenCourses.jsx';
import StudentEnrolledCourses from './pages/StudentEnrolledCourses.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import TeacherActiveCourses from './pages/TeacherActivateCourses.jsx';

function App() {
  const { isAuthenticated, userData } = useAuth() || { isAuthenticated: false, userData: null };
 
  const dashboard = toDashboard(isAuthenticated, userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={dashboard.to} />} />
        <Route path='/login' element={isAuthenticated?<Navigate to={dashboard.to} />:<Login />} />
        <Route path='/dashboard-admin' element={isAuthenticated && userData?.role === 1 ? <AdminPage /> : <Navigate to={dashboard.to} />} />
        <Route path='/list-users' element={isAuthenticated ? <AdminUsers /> : <Navigate to={dashboard.to} />} />
        <Route path='/list-majors' element={isAuthenticated ? <AdminMajors /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-teacher' element={isAuthenticated && userData?.role === 2 ? <TeacherPage /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-student' element={isAuthenticated && userData?.role === 3 ? <StudentPage /> : <Navigate to={dashboard.to} />} />
        <Route path='/change-password' element={isAuthenticated ? <ChangePassword /> : <Navigate to={dashboard.to} />} />
        <Route path='/teacher-courses' element={isAuthenticated ? <TeacherCourses /> : <Navigate to={dashboard.to} />} />
        <Route path='/teacher-active-courses' element={isAuthenticated ? <TeacherActiveCourses /> : <Navigate to={dashboard.to} />} />
        <Route path='/student-courses' element={isAuthenticated ? <StudentCourses /> : <Navigate to={dashboard.to} />} />
        <Route path='/student-open-courses' element={isAuthenticated ? <StudentOpenCourses /> : <Navigate to={dashboard.to} />} />
        <Route path='/student-enrolled-courses' element={isAuthenticated ? <StudentEnrolledCourses /> : <Navigate to={dashboard.to} />} />
      </Routes>
    </BrowserRouter>
  );
};

function toDashboard(isAuthenticated, userData) {
  if (isAuthenticated && userData.role === 3) { return { to: '/dashboard-student', dash: <StudentPage /> }; }
  if (isAuthenticated && userData.role === 2) { return { to: '/dashboard-teacher', dash: <TeacherPage /> }; }
  if (isAuthenticated && userData.role === 1) { return { to: '/dashboard-admin', dash: <AdminPage /> }; }
  
  return { to: '/login', dash: <Login /> };
}

export default App;