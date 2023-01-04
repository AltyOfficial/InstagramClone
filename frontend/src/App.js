import React, {useState, useEffect} from 'react';
import { Button, Modal, makeStyles, Input } from '@material-ui/core';

import './App.css';

import ImageUpload from './ImageUpload.js'
import Post from './Post.js';


const BASE_URL = 'http://localhost:8000/'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))


function App() {

  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType]= useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setAuthToken(window.localStorage.getItem('authToken'));
    setAuthTokenType(window.localStorage.getItem('authTokenType'));
    setUsername(window.localStorage.getItem('username'));
    setUserId(window.localStorage.getItem('userId'));
  }, [])

  useEffect(() => {
    authToken
      ? window.localStorage.setItem('authToken', authToken)
      : window.localStorage.removeItem('authToken')
    
    authTokenType
      ? window.localStorage.setItem('authTokenType', authTokenType)
      : window.localStorage.removeItem('authTokenType')
    
    username
      ? window.localStorage.setItem('username', username)
      : window.localStorage.removeItem('username')
    
    userId
      ? window.localStorage.setItem('userId', userId)
      : window.localStorage.removeItem('userId')
  }, [authToken, authTokenType, userId])

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

  const signIn = (event) => {
    event?.preventDefault();

    let formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + 'auth/login/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        console.log(data)
        setAuthToken(data.access_token)
        setAuthTokenType(data.token_type)
        setUserId(data.user_id)
        setUsername(data.user_username)
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
    
    setOpenSignIn(false)
  }

  const signOut = (event) => {
    setAuthToken(null)
    setAuthTokenType(null)
    setUserId('')
    setUsername('')
  }

  const signUp = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      username: username,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password
    })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json_string
    } 

    fetch(BASE_URL + 'users/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        signIn();
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })

    setOpenSignUp(false)
  }

  return (
    <div className='app'>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>

        <div style={modalStyle} className={classes.paper}>
          <form className='app_signin'>
            <center>
              <img className='app_headerLogo'
                alt='InstagramClone Logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
              />
            </center>
            <Input
             placeholder='username'
             type='text'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
            />
            <Input
             placeholder='password'
             type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              onClick={signIn}>Log In</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}>

        <div style={modalStyle} className={classes.paper}>
          <form className='app_signin'>
            <center>
              <img className='app_headerLogo'
                alt='InstagramClone Logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
              />
            </center>
            <Input
             placeholder='username'
             type='text'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
            />
            <Input
             placeholder='email'
             type='text'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
            <Input
             placeholder='first_name'
             type='text'
             value={first_name}
             onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
             placeholder='last_name'
             type='text'
             value={last_name}
             onChange={(e) => setLastName(e.target.value)}
            />
            <Input
             placeholder='password'
             type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className='app_header'>

        <img className='app_headerLogo'
          alt='InstagramClone Logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
        />

        {authToken ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <div>
              <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
              <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
            </div>
          )
        }

      </div>

      {
        authToken ? (
          <ImageUpload
            authToken={authToken}
            authTokenType={authTokenType}
          />
        ) : (
          <h3>You need to log in to upload</h3>
        )
      }

      <div className='app_posts'>
        {
          posts.map(post => (
            <Post
            post = {post}
            authToken = {authToken}
            authTokenType = {authTokenType}
            userId = {userId}
            />
          ))
        }
      </div>

    </div>
  );
}

export default App;
