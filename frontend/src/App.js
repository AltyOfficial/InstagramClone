import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';

import './App.css';

import Post from './Post.js';


const BASE_URL = 'http://localhost:8000/'


function App() {

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

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
        const result = data.sort((a, b) => {
          const t_a = a.pub_date.split(/[-T:]/);
          const t_b = b.pub_date.split(/[-T:]/);
          const d_a = new Date(Date.UTC(t_a[0], t_a[1]-1, t_a[2], t_a[3], t_a[4], t_a[5]))
          const d_b = new Date(Date.UTC(t_b[0], t_b[1]-1, t_b[2], t_b[3], t_b[4], t_b[5]))
          return d_b - d_a
        })
        return result
      })
      .then(data => {
        setPosts(data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className='app'>

      <div className='app_header'>

        <img className='app_headerLogo'
          alt='InstagramClone Logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
        />

        <div>
          <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
        </div>

      </div>

      <div className='app_posts'>
        {
          posts.map(post => (
            <Post
            post = {post}
            />
          ))
        }
      </div>

    </div>
  );
}

export default App;
