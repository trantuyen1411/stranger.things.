import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postMessage } from '../api';


const SendMessage = ({ postId, token, messages}) => {
    const [message, setMessage] = useState({ content: '' });
    const [messageSent, setMessageSent] = useState(false);
  
    async function addMessage() {
      try {
        // console.log(postId);
        await postMessage(postId, { content: message.content }, token);
        setMessageSent(true);
      } catch (error) {
        console.log("add message error");
        console.error(error);
      }
    }
  
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addMessage();
        }}
      >
        <input
          type='text'
          placeholder='Enter Message'
          onChange={(event) => setMessage({ content: event.target.value })}
        />
        <button type='submit'>Send Message</button>
        {messageSent && <p>Message sent successfully!</p>}
        {messages && messages.length > 0 && (
          <div>
            <h3>Messages for this post:</h3>
            {messages.map((message) => (
              <div key={message._id}>
                <p>From: {message.fromUser.username}</p>
                <p>Content: {message.content}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    );
  };

const ViewPost = ({ token, posts }) => {
  const { postId } = useParams();
  const [activateMessage, setActivateMessage] = useState(false);
 

  const [currentPost] = posts.filter(post => post._id === postId);

  const { title, description, location, price, willDeliver, author, isAuthor, messages, _id } = currentPost || {};
  

  return (
    <div>
      {currentPost && (
        <div className='viewposts'>
          <h1>{title}</h1>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
          <p>Location: {location}</p>
          <p>Will Deliver: {willDeliver ? 'Yes' : 'No'}</p>
          <p>Author: {author && author.username}</p>
          {isAuthor && messages && messages.length > 0 && (
            <SendMessage postId={postId} token={token} messages={messages} />
          )}
         
          <button onClick={() => setActivateMessage(!activateMessage)}>Message this user</button>
          {activateMessage && <SendMessage postId={postId} token={token} />}
            {/* codition for edit post */}

          <Link to={`/edit-post/${postId}`}>Edit Post</Link> 
          
        </div>
      )}
    </div>
  );
};

export default ViewPost;
