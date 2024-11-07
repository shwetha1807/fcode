// src/components/PostForm.js
import React, { useState } from 'react';

const PostForm = ({ onPost }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content) {
            onPost(content); // Call the onPost function passed as a prop
            setContent(''); // Clear the input after posting
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                required
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;