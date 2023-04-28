import React, { useState, useEffect } from 'react';
import { getPosts } from '../api';

const LoggedIn = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await getPosts(token);
      setPosts(postsData.data.posts);
    }

    fetchPosts();
  }, [token]);

  return (
    <div>
      <h1>Logged in successfully!</h1>
    </div>
  );
};

export default LoggedIn;
