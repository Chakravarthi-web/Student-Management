import { useState, useEffect } from 'react';
import api from '../services/api';
import { Briefcase } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="jobs-page animate-fade-in">
      <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <h1>Job Portal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Find your next career opportunity posted by our partners.</p>
      </header>
      
      {jobs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Briefcase size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h3>No Jobs Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="grid-3">
          {jobs.map(job => (
            <div key={job._id} className="glass-card">
              <h3>{job.title}</h3>
              <p style={{ color: 'white', fontWeight: '500', marginBottom: '0.5rem' }}>{job.company}</p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>{job.description}</p>
              <button className="btn btn-primary" style={{ width: '100%' }}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
