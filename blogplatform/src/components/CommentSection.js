import React, { useState } from 'react';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

export default CommentSection;
