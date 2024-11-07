import React, { useState, useEffect } from 'react';

function BlogForm({ addPost, currentPost, updatePost, clearCurrentPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
      setTags(currentPost.tags.join(', '));
      setCategory(currentPost.category);
    } else {
      setTitle('');
      setContent('');
      setTags('');
      setCategory('');
    }
  }, [currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagList = tags.split(',').map(tag => tag.trim()); // Convert tags to an array
    const newPost = { 
      id: currentPost ? currentPost.id : Date.now(), 
      title, 
      content, 
      tags: tagList, 
      category 
    };
    if (currentPost) {
      updatePost(newPost);
    } else {
      addPost(newPost);
    }
    setTitle('');
    setContent('');
    setTags('');
    setCategory('');
  };

  return (
    // In BlogForm component
    <form className="blog-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Travel">Travel</option>
        <option value="Education">Education</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <button type="submit">{currentPost ? "Update Post" : "Add Post"}</button>
      {currentPost && (
        <button type="button" onClick={clearCurrentPost}>
          Add New Post
        </button>
      )}
    </form>
  );
}

export default BlogForm;
