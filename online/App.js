import React, { useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [userType, setUserType] = useState(""); // "student" or "instructor"
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [courses, setCourses] = useState([]); // List of courses
  const [newCourse, setNewCourse] = useState(""); // For adding new course
  const [forumComments, setForumComments] = useState([]); // Comments in the discussion forum
  const [newComment, setNewComment] = useState(""); // For adding new comments

  // Function to handle login
  const handleLogin = () => {
    if (username && password && (userType === "student" || userType === "instructor")) {
      setLoggedIn(true);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUserType("");
    setUsername("");
    setPassword("");
  };

  // Function to add a new course (Instructor only)
  const addCourse = () => {
    if (userType === "instructor" && newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse("");
    }
  };

  // Function to add a new comment
  const addComment = () => {
    if (newComment) {
      setForumComments([...forumComments, { user: username, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div id="app">
      {!loggedIn ? (
        <div className="login-section">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="main-section">
          <button onClick={handleLogout} className="logout-button">Log Out</button>
          <h2>Welcome, {userType === "instructor" ? "Instructor" : "Student"} {username}</h2>
          
          <div className="course-section">
            <h3>Courses</h3>
            {userType === "instructor" && (
              <>
                <input
                  type="text"
                  placeholder="New Course"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
                <button onClick={addCourse}>Add Course</button>
              </>
            )}
            <div className="course-list">
              {courses.map((course, index) => (
                <div key={index} className="course-item">{course}</div>
              ))}
            </div>
          </div>

          <div className="forum-section">
            <h3>Discussion Forum</h3>
            <div className="forum-comments">
              {forumComments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <strong>{comment.user}</strong>: {comment.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment}>Post Comment</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;