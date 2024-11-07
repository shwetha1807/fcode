import React, { useState } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogPost from './components/BlogPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const addPost = (post) => setPosts([...posts, post]);
  const updatePost = (updatedPost) => setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    if (currentPost && currentPost.id === id) {
      setCurrentPost(null);
    }
  };
  const clearCurrentPost = () => setCurrentPost(null);

  // Function to add a comment to the current post
  const addComment = (postId, comment) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...(post.comments || []), comment] } 
        : post
    );
    setPosts(updatedPosts);

    // Update the currentPost to immediately reflect the new comment
    const updatedPost = updatedPosts.find(post => post.id === postId);
    setCurrentPost(updatedPost);
  };

  return (
    <div className="App">
      <h1>Blog Platform</h1>
      <BlogForm addPost={addPost} currentPost={currentPost} updatePost={updatePost} clearCurrentPost={clearCurrentPost} />
      <BlogList posts={posts} setCurrentPost={setCurrentPost} deletePost={deletePost} />
      {currentPost && <BlogPost post={currentPost} addComment={addComment} />}
    </div>
  );
}

export default App;
