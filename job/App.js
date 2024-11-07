import React, { useState } from 'react';
import './App.css';

function App() {
  // States for authentication and user management
  const [currentPage, setCurrentPage] = useState('login');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // States for application data
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // States for forms
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    type: 'jobseeker'
  });
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: ''
  });

  // Authentication handlers
  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      alert('Please fill all fields');
      return;
    }
    setUsers([...users, { ...signupForm, id: Date.now() }]);
    setCurrentPage('login');
    setSignupForm({ name: '', email: '', password: '', type: 'jobseeker' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      u => u.email === loginForm.email && u.password === loginForm.password
    );
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setLoginForm({ email: '', password: '' });
  };

  // Job handling functions
  const handlePostJob = (e) => {
    e.preventDefault();
    const jobData = {
      ...newJob,
      id: Date.now(),
      employerId: currentUser.id,
      postedBy: currentUser.name,
      status: 'open',
      postedDate: new Date().toLocaleDateString()
    };
    setJobs([...jobs, jobData]);
    setNewJob({ title: '', description: '', requirements: '', salary: '' });
  };

  const handleApplyJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    const application = {
      id: Date.now(),
      jobId,
      jobTitle: job.title,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      status: 'pending',
      appliedDate: new Date().toLocaleDateString()
    };
    setApplications([...applications, application]);
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? {...app, status: newStatus} : app
    ));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Job Portal Platform</h1>
        {currentUser && (
          <div className="user-info">
            <span>Welcome, {currentUser.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main className="main-content">
        {/* Login Page */}
        {currentPage === 'login' && (
          <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? 
              <button onClick={() => setCurrentPage('signup')}>Sign up</button>
            </p>
          </div>
        )}

        {/* Signup Page */}
        {currentPage === 'signup' && (
          <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
              />
              <select
                value={signupForm.type}
                onChange={(e) => setSignupForm({...signupForm, type: e.target.value})}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account? 
              <button onClick={() => setCurrentPage('login')}>Login</button>
            </p>
          </div>
        )}

        {/* Dashboard */}
        {currentPage === 'dashboard' && currentUser && (
          <div className="dashboard">
            {/* Employer Dashboard */}
            {currentUser.type === 'employer' && (
              <>
                <section className="post-job">
                  <h2>Post New Job</h2>
                  <form onSubmit={handlePostJob}>
                    <input
                      placeholder="Job Title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                    <textarea
                      placeholder="Job Description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    />
                    <textarea
                      placeholder="Requirements"
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                    />
                    <input
                      placeholder="Salary"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    />
                    <button type="submit">Post Job</button>
                  </form>
                </section>

                <section className="applications-received">
                  <h2>Applications Received</h2>
                  {applications
                    .filter(app => jobs.find(job => job.id === app.jobId)?.employerId === currentUser.id)
                    .map(app => (
                      <div key={app.id} className="application-card">
                        <h3>{app.jobTitle}</h3>
                        <p>Applicant: {app.applicantName}</p>
                        <p>Status: {app.status}</p>
                        <p>Applied Date: {app.appliedDate}</p>
                        <div className="application-actions">
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'accepted')}
                            disabled={app.status !== 'pending'}
                          >
                            Accept
                          </button>
                          <button  onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            disabled={app.status !== 'pending'}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </section>
              </>
            )}

            {/* Job Seeker Dashboard */}
            {currentUser .type === 'jobseeker' && (
              <section className="job-listings">
                <h2>Available Jobs</h2>
                {jobs.length === 0 ? (
                  <p>No jobs available at the moment.</p>
                ) : (
                  jobs.map(job => (
                    <div key={job.id} className="job-card">
                      <h3>{job.title}</h3>
                      <p>{job.description}</p>
                      <p>Salary: {job.salary}</p>
                      <button onClick={() => handleApplyJob(job.id)}>Apply</button>
                    </div>
                  ))
                )}
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;