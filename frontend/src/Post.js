import React, {useState, useEffect} from 'react';
import './Post.css'


const BASE_URL = 'http://localhost:8000/'


function Post({ post }) {

  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    setImageURL(BASE_URL + post.image_url)
  }, [])

  return (
    <div className='post'>
      <img
        className='post_image'
        src={imageURL}
      />
    </div>
  )
}


export default Post
