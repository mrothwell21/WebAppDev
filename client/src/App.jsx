import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import './App.css';

import HomePage          from './pages/Homepage'
import AdminPage    from "./pages/AdminPage";

const router = createBrowserRouter([
   { path: '/',
     element: <RootLayout />,
     errorElement: <NotFound404 />,
     children: [
      { path : '/', element: <HomePage />},
      { path : '/admin' , element: <AdminPage />},
      { path : '*',          element: <NotFound404 />},
     ]
    }
   
]);

function App() {
  const { isAuthenticated, userData } = useAuth() || { isAuthenticated: false, userData: null };
  const userRole = (isAuthenticated) ? userData.role : 'user';
  const dashboard = toDashboard(isAuthenticated, userRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={dashboard.to} />} />
        <Route path='/login' element={<Navigate to={dashboard.to} />} />
        <Route path='/dashboard-admin' element={isAuthenticated && userRole === 'admin' ? <DashboardAdmin /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-teacher' element={isAuthenticated && userRole === 'teacher' ? <DashboardTeacher /> : <Navigate to={dashboard.to} />} />
        <Route path='/dashboard-student' element={isAuthenticated && userRole === 'student' ? <DashboardStudent /> : <Navigate to={dashboard.to} />} />
      </Routes>
    </BrowserRouter>
    );
  };

  function toDashboard(isAuthenticated, role) {
    if (isAuthenticated && role === 'student') { return { to: '/dashboard-student', dash: <DashboardStudent /> }; }
    if (isAuthenticated && role === 'teacher') { return { to: '/dashboard-teacher', dash: <DashboardTeacher /> }; }
    if (isAuthenticated && role === 'admin') { return { to: '/dashboard-admin', dash: <DashboardAdmin /> }; }

    return { to: '/login', dash: <Login /> };
}

export default App;
