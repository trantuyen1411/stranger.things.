import React, { useState } from 'react';
import { makePost } from '../api';

function CreatePost({ token, fetchPosts }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [isPostAdded, setIsPostAdded] = useState(false);

  async function addPost() {
    console.log('addPost ' + token);
    const result = await makePost(token, {
      title: title,
      description: description,
      price: price,
      location: location,
      willDeliver: willDeliver,
    });
    fetchPosts(token);
    setIsPostAdded(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addPost();
  };

  return (
    <div className='create-box'>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Will Deliver:
          <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />
        </label>
        <button type="submit">Create Post</button>
      </form>
      {isPostAdded && <p>Post added successfully!</p>}
    </div>
  );
}

export default CreatePost;
