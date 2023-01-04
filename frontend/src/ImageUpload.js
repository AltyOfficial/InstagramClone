import React, {useState} from 'react';
import { Button, Modal, makeStyles, Input } from '@material-ui/core';

import './ImageUpload.css'


const BASE_URL = 'http://localhost:8000/'


function ImageUpload({authToken, authTokenType}) {

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append('image', image)

    const requestOptions = {
      method: 'POST',
      headers: new Headers ({
        'Authorization': authTokenType + ' ' + authToken
      }),
      body: formData
    }

    fetch(BASE_URL + 'posts/upload_image/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        createPost(data.filename)
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        setCaption('')
        setImage(null)
        document.getElementById('fileInput').value = null
      })
  }

  const createPost = (imageUrl) => {

    const json_string = JSON.stringify({
      'caption': caption,
      'image_url': imageUrl
    })

    const requestOptions = {
      method: 'POST',
      headers: new Headers ({
        'Authorization': authTokenType + ' ' + authToken,
        'Content-Type': 'application/json'
      }),
      body: json_string
    }

    fetch(BASE_URL + 'posts/', requestOptions)
     .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response
     })
     .then(data => {
      window.location.reload()
      window.scrollTo(0, 0)
     })
     .catch(error => {
      console.log(error);
      alert(error);
    })
  }

  return (
    <div className='imageUpload'>
      <input
        type='text'
        id='fileInput'
        placeholder='enter the caption'
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input
        type='file'
        id='fileInput'
        onChange={handleChange}
      />
      <Button className='imageUploadButton' onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}


export default ImageUpload;
