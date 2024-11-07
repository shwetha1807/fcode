import React from 'react';

function BlogList({ posts, setCurrentPost, deletePost }) {
  return (
    <div className="blog-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
          <button className="btn btn-edit" onClick={() => setCurrentPost(post)}>View</button>
          <button className="btn btn-delete" onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
