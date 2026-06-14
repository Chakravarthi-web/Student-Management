import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!user) return null;

  return (
    <div className="dashboard animate-fade-in">
      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back, <span style={{ color: 'white', fontWeight: '600' }}>{user.name}</span>! You are logged in as <strong style={{ color: 'var(--primary-color)', textTransform: 'capitalize' }}>{user.role}</strong>.</p>
      </header>

      {user.role === 'admin' && (
        <div className="admin-dashboard">
          <div className="grid-3">
            <div className="glass-card">
              <h3>Manage Users</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>View, edit, and delete system users.</p>
              <button className="btn btn-outline">View Users</button>
            </div>
            <div className="glass-card">
              <h3>Manage Jobs</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Post and manage job opportunities.</p>
              <button className="btn btn-outline">View Jobs</button>
            </div>
            <div className="glass-card">
              <h3>System Settings</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Configure global system preferences.</p>
              <button className="btn btn-outline">Settings</button>
            </div>
          </div>
        </div>
      )}

      {user.role === 'trainer' && (
        <div className="trainer-dashboard">
          <div className="grid-3">
            <div className="glass-card">
              <h3>My Courses</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Manage the courses you are teaching.</p>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Create New Course</button>
              <button className="btn btn-outline" style={{ width: '100%' }}>View All</button>
            </div>
            <div className="glass-card">
              <h3>Assignments</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Grade submissions from your students.</p>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Submissions</button>
            </div>
          </div>
        </div>
      )}

      {user.role === 'student' && (
        <div className="student-dashboard">
          <div className="grid-3">
            <div className="glass-card">
              <h3>My Learning</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Continue where you left off.</p>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Enrolled Courses</button>
            </div>
            <div className="glass-card">
              <h3>Pending Assignments</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>You have 2 upcoming deadlines.</p>
              <button className="btn btn-primary" style={{ width: '100%' }}>Submit Work</button>
            </div>
            <div className="glass-card">
              <h3>Job Applications</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Track your placement status.</p>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
