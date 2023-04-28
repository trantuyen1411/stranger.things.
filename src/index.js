import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import {
  Posts,
  CreatePost,
  Login,
  Register,
  Profile,
  Home,
  LoggedIn,
  ViewPost,
  EditPost,
  SearchBar,
} from './components';

import { getPosts, login, myData } from './api'


function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')??'');
  const [user, setUser] = useState({});



  async function fetchPosts(token) {
    const postsData = await getPosts(token);
    setPosts(postsData.data.posts);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await myData(token);
      if (response && response.data && response.data.user) {
        setUser(response.data.user);
      }
      await fetchPosts(token);
    }
    fetchData();
  }, [token]);

  useEffect(() => {localStorage.setItem('token', token )},
  [token]);

  const handleLogout = () => {
    setToken('');
    setUser(null);
  };

  if (!token) {
    return (
      <>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/login">Login</Link> |
          <Link to="/posts">Posts</Link> |
        </nav>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login login={login} setToken={setToken} token={token} />
        </Route>
        <Route path="/register">
          <Register setToken={setToken} />
        </Route>
      </>
    );
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/posts">Posts</Link> |
        <Link to="/profile">Profile</Link> |
        <Link to="/" onClick={handleLogout}>Logout</Link>
      </nav>

      <Route exact path="/">
        <LoggedIn token={token} />
      </Route>

      <Route path="/posts">
        {console.log(token)}
        <Posts posts={posts} token={token} setPosts={setPosts} />
      </Route>

      <Route path="/create-post">
        <CreatePost token={token} fetchPosts={fetchPosts} />
      </Route>

      <Route path="/:postId">
        <ViewPost token={token} posts={posts} />
      </Route>

      <Route path="/profile">
        <Profile token={token} />
      </Route>
      <Route path='/edit-post/:postId'>
        <EditPost
          token={token}
          posts={posts}
          fetchPosts={fetchPosts} />

      </Route>

      <Route
        path="/searchbar-post">
        <SearchBar posts={posts} />
      </Route>


    </>

  );
}

const root = document.getElementById('app');
createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
