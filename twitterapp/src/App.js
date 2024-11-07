// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import './styles.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState(null);

    const handlePost = (content) => {
        setPosts((prevPosts) => [...prevPosts, { content, user: username }]);
      };

    const handleRepost = (post) => {
        setPosts([...posts, { content: `Reposted: ${post.content}`, user: username }]);
    };

    const handleLogin = (username) => {
        setUsername(username);
    };

    const handleSignup = (username) => {
        setUsername(username);
    };

    const handleLogout = () => {
        setUsername(null);
    };

    return (
        <div>
            <Navbar username={username} onLogout={handleLogout} />
            <HomePage
                posts={posts}
                onRepost={handleRepost}
                onLogin={handleLogin}
                onSignup={handleSignup}
                username={username}
                onPost={handlePost}
            />
        </div>
    );
};

export default App;