import React, { useState, useEffect } from "react";
function PostTemplate({post, onDelete}){

//handle delete posts
  const handleDeleteClick = () => {
    //change api address
    fetch(`/api/posts/${post.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        onDelete(data.id);
      })
      .catch((error) => console.error(error));
  };
    return (
      <div>
        <p>Post: {post.postContent}</p>
        <p>Likes: {post.likeCount}</p>
        <p>Dislikes: {post.dislikeCount}</p>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    );
}

function MyProfile(){
  const [myPosts, setMyPosts] = useState([]);
  //handle get my posts
  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setMyPosts(data))
      .catch((error) => console.error(error));
  }, []);
  //handle counter
  const handleDeletePost = (postId) => {
    setMyPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  return (
    <div>
      {myPosts.map((post) => (
        <PostTemplate key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default MyProfile;