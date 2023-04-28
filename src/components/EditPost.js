import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { updatePost } from '../api';

const TitleInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='title'>Title:</label>
      <input type='text' id='title' value={value} onChange={onChange} />
    </div>
  );
};

const DescriptionInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='description'>Description:</label>
      <input type ='text' id='description' value={value} onChange={onChange} />
    </div>
  );
};

const LocationInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='location'>Location:</label>
      <input type='text' id='location' value={value} onChange={onChange} />
    </div>
  );
};

const PriceInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='price'>Price:</label>
      <input type='text' id='price' value={value} onChange={onChange} />
    </div>
  );
};

const WillDeliverInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='willDeliver'>Will Deliver:</label>
      <input type='checkbox' id='willDeliver' checked={value} onChange={onChange} />
    </div>
  );
};

const EditPost = ({ posts, token, fetchPosts }) => {
  const { postId} = useParams();
  console.log(postId)

  const history = useHistory();
  const [currentPost] = posts.filter((post) => post._id === postId);

  const { title, description, location, price, willDeliver, isAuthor} = currentPost;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newPrice, setNewPrice] = useState(price);
  const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);
  const [isPostUpdated, setIsPostUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPost = {
      title: newTitle,
      description: newDescription,
      location: newLocation,
      price: newPrice,
      willDeliver: newWillDeliver,
      postId: postId,
    };
    await updatePost({token, ...updatedPost});
    history.push(`/edit-post/${postId}`);
    fetchPosts(token)
    setIsPostUpdated(true);
  };

 

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={(event) => handleSubmit(event, postId)}>
        <TitleInput value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
        <DescriptionInput
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        />
        <LocationInput value={newLocation} onChange={(event) => setNewLocation(event.target.value)} />
        <PriceInput value={newPrice} onChange={(event) => setNewPrice(event.target.value)} />
        <WillDeliverInput
          value={newWillDeliver}
          onChange={(event) => setNewWillDeliver(event.target.checked)}
        />
        <button type='submit'>Save Changes</button>
      </form>
      {isPostUpdated && <p>Post successfully updated!</p>}
    </div>
  );
};

export default EditPost;
