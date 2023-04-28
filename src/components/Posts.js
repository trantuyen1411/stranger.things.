import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';

const Posts = ({ posts, token, setPosts }) => {
  const handleDelete = async (token, postId) => {
    await deletePost(token, postId);
    setPosts(posts.filter((post) => post._id !== postId));
  };

  if (!posts || posts.length == 0) {
    return <div>No posts to display</div>;
  }
  return (
    <div className="posts-container">
        {console.log(token)}
        <Link to="/searchbar-post">Search</Link>
      <h1>Posts</h1>
      <p>Number of posts: {posts.length}</p>
      <Link to="/create-post">Create Post</Link>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>Description: {post.description}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
          <p>Author: {post.author.username}</p>
          {post.isAuthor && post.messages && post.messages.length > 0 && (
            <div>
              <h3>Messages for this post:</h3>
              {post.messages.map((message) => (
                <div key={message._id}>
                  <p>From: {message.fromUser.username}</p>
                  <p>Content: {message.content}</p>
                </div>
              ))}
            </div>
          )}
          {console.log(post)}
          {post.isAuthor && (
            <button onClick={() => handleDelete(token, post._id)}>Delete Post</button>
          )}
          
          <Link to={`/${post._id}`}>View Post</Link> 

        </div>
      ))}
    </div>
  );
};

export default Posts;
