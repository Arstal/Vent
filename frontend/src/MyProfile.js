import React, { useState, useEffect } from 'react';

function MyProfile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/profile/posts')
      .then(response => response.json())
      .then(data => {
        // Convert the response data to an array of posts
        const postsArray = Object.values(data).map(post => post);
        setPosts(postsArray);
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
    <div>
      <h1>Your Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>
          <p>Dislikes: {post.dislikes}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyProfile;
