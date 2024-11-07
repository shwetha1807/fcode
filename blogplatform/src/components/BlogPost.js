import React, { useState } from 'react';

function BlogPost({ post, addComment }) {
  const [comment, setComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
      <p>{post.content}</p>
      
      <h3>Comments</h3>
      <ul>
        {(post.comments || []).map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      
      <form onSubmit={handleAddComment}>
        <input 
          type="text" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Add a comment" 
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default BlogPost;
