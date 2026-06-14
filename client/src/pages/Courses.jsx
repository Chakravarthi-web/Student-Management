import { useState, useEffect } from 'react';
import api from '../services/api';
import { Book } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="courses-page animate-fade-in">
      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <h1>Course Catalog</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Browse and enroll in available courses to upgrade your skills.</p>
      </header>
      
      {courses.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Book size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h3>No Courses Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Check back later for new additions.</p>
        </div>
      ) : (
        <div className="grid-3">
          {courses.map(course => (
            <div key={course._id} className="glass-card">
              <h3>{course.title}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>{course.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>
                  Trainer: {course.trainerId?.name || 'Unknown'}
                </span>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Enroll</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
