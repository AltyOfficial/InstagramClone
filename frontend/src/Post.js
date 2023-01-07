import React, {useState, useEffect} from 'react';
import {Avatar, Button} from '@material-ui/core';

import './Post.css'


const BASE_URL = 'http://localhost:8000/'


function Post({ post, authToken, authTokenType, userId }) {

  const [imageURL, setImageURL] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const isAuthor = post.owner.id == userId

  useEffect(() => {
    setImageURL(BASE_URL + post.image_url)
  }, [])

  useEffect(() => {
    setComments(post.comments)
  }, [])

  const handleDelete = (event) => {
    event?.preventDefault();

    const requestOptions = {
      method: 'DELETE',
      headers: new Headers ({
        'Authorization': authTokenType + ' ' + authToken
      })
    }

    fetch(BASE_URL + 'posts/' + post.id, requestOptions)
      .then(response => {
        if (response.ok) {
          window.location.reload()
        }
        throw response
      })
      .catch(error => {
        console.log(error);
      })
  }

  const postComment = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      'text': newComment
    })

    const requestOptions = {
      method: 'POST',
      headers: new Headers ({
        'Authorization': authTokenType + ' ' + authToken,
        'Content-Type': 'application/json'
      }),
      body: json_string
    }

    fetch(BASE_URL + 'posts/' + post.id + '/comments/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        fetchComments();
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setNewComment('');
      })
  }

  const fetchComments = () => {

    const requestOptions = {
      method: 'GET'
    }

    fetch(BASE_URL + 'posts/' + post.id + '/comments/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response
      })
      .then(data => {
        setComments(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className='post'>

      <div className='post_header'>
        <Avatar
          alt='user-avatar'
          src=''
        />
        <div className='post_headerInfo'>
          <h3>{post.owner.username}</h3>

          {isAuthor ? (
              <Button className='post_delete' onClick={handleDelete}>Delete</Button>
            ) : (
              <div></div>
            )
          }

        </div>
      </div>

      <img
        className='post_image'
        src={imageURL}
      />

      <h4 className='post_caption'>{post.caption}</h4>

      <div className='post_comments'>
        {
          comments.map((comment) => (
            <p>
              <strong>
                {comment.author.username}:
              </strong>
              {comment.text}
            </p>
          ))
        }
      </div>

      {authToken && (
        <form className='post_comment_box'>
          <input className='post_comment_input'
            type='text'
            placeholder='Add a Comment'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className='post_comment_button'
            type='submit'
            disabled={!newComment}
            onClick={postComment}>
              Post
          </button>
        </form>
      )}

    </div>
  )
}


export default Post
