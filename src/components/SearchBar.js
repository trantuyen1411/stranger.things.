import React, { useState } from 'react';
import { getPosts } from '../api';
import Posts from './Posts';


const SearchBar = ({posts, setPosts}) => {

  const [searchTerm, setSearchTerm] = useState('');

  
  

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedPosts = await getPosts(searchTerm);
    if (Array.isArray(updatedPosts.data)) {
      setPosts(updatedPosts.data.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      console.error('getPosts returned invalid data:', updatedPosts);
    }
  
    // setPosts(postsToDisplay.posts);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchTerm} onChange={handleChange} />
        <button type='submit'>Search</button>
      </form>
      {postsToDisplay.map((post) => (
  <Posts key={post._id} post={post} />
))}
    </div>
  );
};

export default SearchBar;

