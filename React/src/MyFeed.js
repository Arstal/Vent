import React, { useEffect, useState } from 'react';
import './MyFeed.css';
function MyFeed() {
  const [postContent, setPostContent] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const fetchPostData = () => {
    //change the api address to connect
    fetch("/api")
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
    fetch("/api", {method: "POST"})
      .then((response) => response.json())
      .then((data) => {
        setLikeCount(data.likeCount);
        fetchPostData();
      });
  };
  const handleDislikeClick = () => {
    //change dictionary name to match flask
    fetch("/api", {method: "POST"})
      .then((response) => response.json())
      .then((data) => {
        setLikeCount(data.setDislikeCount);
        fetchPostData();
    });
  };
  return (
    //change dictionary name to match flask
    <div className='MyFeed'>
      <button className = "like" onClick={handleLikeClick}></button>
      <h4>Like ({likeCount})</h4>
      <h2 className='feed'>{postContent}</h2>
      <button className = "dislike" onClick={handleDislikeClick}></button>
      <h4>Dislike ({dislikeCount})</h4>
    </div>
  );
}

export default MyFeed;