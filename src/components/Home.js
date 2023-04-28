import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div>
            <h1>Welcome to Strangers' Things!</h1>
            <p>Log in to see more</p>
            <Link to="/login">Login</Link>
            <p>Don't have an account yet?</p>
            <Link to="/register">Register here</Link>

        </div>
    );
}
export default Home 