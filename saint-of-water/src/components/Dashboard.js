import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtyl24bsyqEDTAPmcb4i1-oEKeKM2HMbs",
  authDomain: "upload-c092e.firebaseapp.com",
  projectId: "upload-c092e",
  storageBucket: "upload-c092e.appspot.com",
  messagingSenderId: "90496428324",
  appId: "1:90496428324:web:3e2725322cbffbafdd6bb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Dashboard = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgUploadSuccess, setImgUploadSuccess] = useState(false);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === 'image') {
      setImg(file);
    } else if (fileType === 'video') {
      setVideo(file);
    }
  };

  const handleImageUpload = () => {
    if (img) {
      const imgRef = ref(storage, `images/${uuidv4()}`); // Store images in the 'images' folder
      uploadBytes(imgRef, img).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setImgUploadSuccess(true);
          setVideoUploadSuccess(false);
          setError(null);
        }).catch(error => {
          setImgUploadSuccess(false);
          setVideoUploadSuccess(false);
          setError('Error getting download URL for image');
          console.error('Error getting download URL for image', error);
        });
      }).catch(error => {
        setImgUploadSuccess(false);
        setVideoUploadSuccess(false);
        setError('Error uploading image');
        console.error('Error uploading image', error);
      });
    }
  };
  
  const handleVideoUpload = () => {
    if (video) {
      const videoRef = ref(storage, `videos/${uuidv4()}`); // Store videos in the 'videos' folder
      uploadBytes(videoRef, video).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setVideoUploadSuccess(true);
          setImgUploadSuccess(false);
          setError(null);
        }).catch(error => {
          setVideoUploadSuccess(false);
          setImgUploadSuccess(false);
          setError('Error getting download URL for video');
          console.error('Error getting download URL for video', error);
        });
      }).catch(error => {
        setVideoUploadSuccess(false);
        setImgUploadSuccess(false);
        setError('Error uploading video');
        console.error('Error uploading video', error);
      });
    }
  };
  
  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Image and Video Upload Component</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Upload Image:</Typography>
        <TextField type="file" onChange={(e) => handleFileChange(e, 'image')} />
        <Button variant="contained" color="primary" onClick={handleImageUpload} sx={{ mt: 1 }}>
          Upload Image
        </Button>
        {imgUploadSuccess && <Typography variant="body1" sx={{ mt: 1, color: 'green' }}>Image uploaded successfully!</Typography>}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Upload Video:</Typography>
        <TextField type="file" onChange={(e) => handleFileChange(e, 'video')} />
        <Button variant="contained" color="primary" onClick={handleVideoUpload} sx={{ mt: 1 }}>
          Upload Video
        </Button>
        {videoUploadSuccess && <Typography variant="body1" sx={{ mt: 1, color: 'green' }}>Video uploaded successfully!</Typography>}
      </Box>
      {error && <Typography variant="body1" sx={{ mt: 1, color: 'red' }}>{error}</Typography>}
    </Box>
  );
};

export default Dashboard;
