import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', following: false },
    { id: 2, name: 'Bob', following: false },
    { id: 3, name: 'Charlie', following: false },
    { id: 4, name: 'David', following: false },
  ]);

  const [posts, setPosts] = useState([
    { id: 1, content: "Hello world from Alice!", author: "Alice" },
    { id: 2, content: "Learning React!", author: "Bob" },
    { id: 3, content: "This is a post by Charlie", author: "Charlie" },
  ]);

  const [newsFeed, setNewsFeed] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [currentUser] = useState("User123");
  const [following, setFollowing] = useState([]);
  const [followers] = useState(["David", "Emma"]); // Static followers for simplicity

  // Toggle following a user
  const toggleFollow = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, following: !user.following } : user
    );

    setUsers(updatedUsers);

    // Update the list of users being followed
    const newFollowing = updatedUsers.filter(user => user.following).map(user => user.name);
    setFollowing(newFollowing);
    updateNewsFeed(newFollowing);
  };

  // Update news feed with posts from followed users AND your own posts
const updateNewsFeed = (currentFollowing) => {
  const feed = posts.filter(post => 
    currentFollowing.includes(post.author) || post.author === currentUser
  );
  setNewsFeed(feed);
};

const handleCreatePost = () => {
  if (newPost) {
    const post = { id: posts.length + 1, content: newPost, author: currentUser };
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    // Immediately update the news feed with the new post
    setNewsFeed(prevFeed => [post, ...prevFeed]);
    setNewPost(""); // Clear input
  }
};

  return (
    <div id="app">
      <header className="header">
        <h1>Social Media Platform</h1>
      </header>

      <div className="content">
        <div className="sidebar">
          <h2>People</h2>
          {users.map((user) => (
            <div key={user.id} className="user">
              <span>{user.name}</span>
              <button onClick={() => toggleFollow(user.id)}>
                {user.following ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}

          <div className="follow-info">
            <h3>Following</h3>
            {following.length > 0 ? (
              following.map((user, index) => <div key={index}>{user}</div>)
            ) : (
              <p>No following yet</p>
            )}
            <h3>Followers</h3>
            {followers.length > 0 ? (
              followers.map((user, index) => <div key={index}>{user}</div>)
            ) : (
              <p>No followers yet</p>
            )}
          </div>
        </div>

        <div className="main-section">
          <div className="create-post">
            <textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button onClick={handleCreatePost}>Post</button>
          </div>

          <div className="feed">
            <h2>News Feed</h2>
            {newsFeed.length > 0 ? (
              newsFeed.map((post) => (
                <div key={post.id} className="post">
                  <p><strong>{post.author}</strong></p>
                  <p>{post.content}</p>
                </div>
              ))
            ) : (
              <p>No posts to show from people you follow.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;