// src/components/Post.js
import React from 'react';

const Post = ({ post, onRepost }) => {
    return (
        <div>
            <p><strong>{post.user}:</strong> {post.content}</p>
            <button onClick={() => onRepost(post)}>Repost</button>
        </div>
    );
};

export default Post;