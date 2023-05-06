import React, { useEffect, useState } from 'react';
import './MyFeed.css';
function MyFeed() {
  const [username, setUsername] = useState("");
  const [postContent, setPostContent] = useState("Post Goes Here");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const fetchPostData = () => {
    //change the api address to connect
    fetch("/MyFeed")
      .then((response) => response.json())
      .then((data) => {
        //change dictionary name to match flask
        setPostContent(data.postContent);
        setLikeCount(data.likeCount);
        setDislikeCount(data.setDislikeCount);
    });
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  const handleLikeClick = () => {
    //change dictionary name to match flask
    fetch("/like", {method: "PUT"})
      .then((response) => response.json())
      .then((data) => {
        setLikeCount(data.likeCount);
        fetchPostData();
      });
  };
  const handleDislikeClick = () => {
    //change dictionary name to match flask
    fetch("/dislike", {method: "PUT"})
      .then((response) => response.json())
      .then((data) => {
        setLikeCount(data.setDislikeCount);
        fetchPostData();
    });
  };
  const handleFollow = () => {
    //change dictionary name to match flask
    fetch("/api", {method: "PUT"})
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.setUsername);
        fetchPostData();
    });
  };
  return (
    //change dictionary name to match flask
    <div className='MyFeed'>
      <button className = "like" onClick={handleLikeClick}>{likeCount}</button>
      <h3>{username}</h3>
      <button className= "follow" onclick={handleFollow}>Follow</button>
      <h2 className='feed'>{postContent}</h2>
      <button className = "dislike" onClick={handleDislikeClick}>{dislikeCount}</button>
    </div>
  );
}

export default MyFeed;
