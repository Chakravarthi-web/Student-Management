import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, GraduationCap } from 'lucide-react';

const Home = () => {
  return (
    <div className="home">
      <header style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '4rem' }}>
        <h1>Welcome to SmartLearn</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          The ultimate platform for learning, tracking progress, and landing your dream job.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get Started Now
          </Link>
          <Link to="/courses" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Browse Courses
          </Link>
        </div>
      </header>

      <div className="grid-3">
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <BookOpen size={48} />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Expert-led Courses</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Learn from top industry professionals and acquire the skills you need to succeed.
          </p>
        </div>
        
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--success-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <GraduationCap size={48} />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Track Progress</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Submit assignments, receive grades, and monitor your learning journey in real-time.
          </p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--warning-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Briefcase size={48} />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Job Placements</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Apply to exclusive job postings directly through our integrated placement portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
