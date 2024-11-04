import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import './App.css';

import HomePage          from './pages/HomePage'
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
  return (
    <>
    <RouterProvider router={router} />
    
    </>
  );
}

export default App;