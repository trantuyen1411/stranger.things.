import React, { useState, useEffect } from 'react';
import { myData, getPosts } from '../api';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await myData(token);
      if (response && response.data && response.data) {
        setUser(response.data);
      }
      const postsData = await getPosts(token);
      setPosts(postsData.data.posts);
    }

    fetchData();
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      {user.messages.length > 0 && (
        <div className="inbox">
          <h2>Inbox</h2>
          {user.messages.map((message) => (
            <div className ="message"key={message._id}>
              <p>From User: {message.fromUser.username} </p>
              <p>Message: {message.content}</p>
              {user._id === message.fromUser._id && (
                <p>Sent to: {message.post.author.username}</p>
              )}
              {user._id !== message.fromUser._id && (
                <p>Sent by: {message.fromUser.username}</p>
              )}
              <p>Post Reference: {message.post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
