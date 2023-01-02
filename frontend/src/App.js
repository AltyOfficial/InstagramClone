import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js';


const BASE_URL = 'http://localhost:8000/'


function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + 'posts/')
      .then(response => {
        const json = response.json()
        console.log(json);
        if (response.ok) {
          return json
        }
        throw response
      })
      .then(data => {
        setPosts(data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className='app_posts'>
      {
        posts.map(post => (
          <Post
           post = {post}
          />
        ))
      }
    </div>
  );
}

export default App;
