// src/components/Navbar.js
import React from 'react';

const Navbar = ({ username, onLogout }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1da1f2', color: 'white' }}>
            <h2>Twitter Clone</h2>
            <div>
                {username ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Welcome, {username}</span>
                        <button onClick={onLogout} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <span>Please log in or sign up</span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;