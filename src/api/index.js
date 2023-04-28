
// Define the base URL for the API
const COHORT_NAME = '2301-FTB-PT-WEB-PT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const getPosts = async (token) => {
  console.log('getPosts ' + token);
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    return result;
  } catch(error) {
    console.log(err);
  }
}

export const registerUser = async (username, password, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    });
    const result = await response.json();
    console.log(result)
    return result
  } catch (err) {
    console.error(err);
  }
}


export const login = async (username,password, token) => {

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
export const myData = async (token) => {

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const makePost = async (token, {title, description, price, location, willDeliver}) => {
  console.log('makePost ' + token)
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          location,
          description,
          price,
          willDeliver
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}



export const updatePost = async ({token, title, description, price, location, willDeliver, postId}) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
          _id : postId,
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}


export const deletePost = async (token, postId) => {
  try{
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
})
    
    const data = await response.json();
    return data;
  } catch(ex) {
    console.log('error deleting post')
  }
}


export const postMessage = async (postId, message, token) => {
  try {
    console.log(postId)
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.log("error");
    console.error(err);
  }
}

