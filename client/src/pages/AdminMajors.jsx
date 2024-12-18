import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import NavigationBar from "../components/Navigation";
import Majors from '../components/Majors';
import { useMajors } from '../hooks/getMajors' 

function AdminMajors() {
  const { logout } = useAuth();
  const { majors, loading, error, fetchMajors, updateMajor } = useMajors();

  useEffect(() => {
    fetchMajors();
  }, []);

  const handleMajorUpdate = async (majorId, majorData) => {
    const success = await updateMajor(majorId, majorData);
    if (success) {
      // Refetch the user list after successful update
      await fetchMajors();
    }
    return success;
  };


  if (error) {
    return (
      <div className="container">
        <div className="banner">
          <NavigationBar role="admin" onLogout={logout} />
        </div>
        <div className="content" style={{ paddingTop: "87px" }}>
          <div className="alert alert-danger" role="alert">
            Error: {error}
            <button className="btn btn-link" onClick={fetchMajors}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="banner">
          <NavigationBar role="admin" onLogout={logout} />
        </div>
        <div className="content" style={{ paddingTop: "87px" }}>
          <div>Loading majors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role="admin" onLogout={logout} />
      </div>
      <br /><br />
      <div className="content" style={{ paddingTop: "87px" }}>
        <Majors 
        role="admin" 
        majorList={majors}
        onUpdateMajor={handleMajorUpdate} />
        <br />
      </div>
    </div>
  );
}

export default AdminMajors;
