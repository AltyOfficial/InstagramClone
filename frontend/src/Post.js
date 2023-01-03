import React, {useState, useEffect} from 'react';
import {Avatar, Button} from '@material-ui/core';

import './Post.css'


const BASE_URL = 'http://localhost:8000/'


function Post({ post }) {

  const [imageURL, setImageURL] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    setImageURL(BASE_URL + post.image_url)
  }, [])

  useEffect(() => {
    setComments(post.comments)
  }, [])

  return (
    <div className='post'>

      <div className='post_header'>
        <Avatar
          alt='user-avatar'
          src=''
        />
        <div className='post_headerInfo'>
          <h3>{post.owner.username}</h3>
          <Button className='post_delete'>Delete</Button>
        </div>
        {/* <div className='post_headerInfo'>
          <h3>{post.author.username}</h3>
          <Button className='post_delete'>Delete</Button>
        </div> */}
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
