// src/components/HomePage.js
import React, { useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';

const HomePage = ({ posts, onRepost, onLogin, onSignup, username, onPost }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [inputUsername, setInputUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            onSignup(inputUsername);
        } else {
            onLogin(inputUsername);
        }
        setInputUsername('');
    };

    return (
        <div>
            {username ? (
                <>
                    <h1>Welcome, {username}!</h1>
                    <PostForm onPost={onPost} /> {/* Pass onPost function here */}
                    {posts.map((post, index) => (
                        <Post key={index} post={post} onRepost={onRepost} />
                    ))}
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>{isSignup ? 'Signup' : 'Login'}</h2>
                    <input
                        type="text"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
                    <p>
                        {isSignup ? 'Already have an account?' : 'Don’t have an account?'}
                        <button type="button" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'Login' : 'Signup'}
                        </button>
                    </p>
                </form>
            )}
        </div>
    );
};

export default HomePage;