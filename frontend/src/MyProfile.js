import React, { useState, useEffect } from 'react';
import "./MyProfile.css"
function MyProfile() {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    fetch('/profile/posts')
      .then(response => response.json())
      .then(data => {
        // Convert the response data to an array of posts
        const postsArray = Object.values(data).map(post => post);
        setPosts(postsArray);
        setFollowing(data.following);
        setFollower(data.follower);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (postId) => {
    fetch('/profile/post/delete', {
      method: 'PUT',
      body: JSON.stringify({postId}),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="posts-container">
      <h1>My Posts</h1>
      <h2>Following: {following} | follower: {follower}</h2>
      {posts.map(post => (
        <div className ="post" key={post.id}>
          <h4>{post.content}</h4>
          <p className="likes">Likes: {post.likes} | Dislikes: {post.dislikes}</p>
          <button className = "delete" onClick={() => handleDelete(post.id)}></button>
        </div>
      ))}
    </div>
  );
}

export default MyProfile;