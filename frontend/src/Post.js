import React, {useState, useEffect} from 'react';
import {Avatar, Button} from '@material-ui/core';

import './Post.css'


const BASE_URL = 'http://localhost:8000/'


function Post({ post, authToken, authTokenType, userId }) {

  const [imageURL, setImageURL] = useState('')
  const [comments, setComments] = useState([])
  const isAuthor = post.owner.id == userId

  useEffect(() => {
    setImageURL(BASE_URL + post.image_url)
  }, [])

  useEffect(() => {
    setComments(post.comments)
  }, [])

  const handleDelete = (event) => {
    event?.preventDefault();

    const requestOption = {
      method: 'DELETE',
      headers: new Headers ({
        'Authorization': authTokenType + ' ' + authToken
      })
    }

    fetch(BASE_URL + 'posts/' + post.id, requestOption)
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

  return (
    <div className='post'>

      <div className='post_header'>
        <Avatar
          alt='user-avatar'
          src=''
        />
        <div className='post_headerInfo'>
          <h3>{post.owner.username} + {isAuthor} {post.owner_id}</h3>

          {userId ? (
              <Button className='post_delete' onClick={handleDelete}>Delete</Button>
            ) : (
              <div>{isAuthor} {post.owner.id} {userId}</div>
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
    </div>
  )
}


export default Post
