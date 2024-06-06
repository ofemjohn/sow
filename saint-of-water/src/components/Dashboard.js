import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { storage } from './Config';

const Dashboard = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [bulletin, setBulletin] = useState(null);

  const [imgUploadSuccess, setImgUploadSuccess] = useState(false);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(false);
  const [bulletinUploadSuccess, setBulletinUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === 'image') {
      setImg(file);
    } else if (fileType === 'video') {
      setVideo(file);
    } else if (fileType === 'bulletin') {
      setBulletin(file);
    }
  };

  const handleImageUpload = () => {
    if (img) {
      const imgRef = ref(storage, `images/${uuidv4()}`);
      uploadBytes(imgRef, img).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setImgUploadSuccess(true);
          setVideoUploadSuccess(false);
          setBulletinUploadSuccess(false);
          setError(null);
        }).catch(error => {
          setImgUploadSuccess(false);
          setVideoUploadSuccess(false);
          setBulletinUploadSuccess(false);
          setError('Error getting download URL for image');
          console.error('Error getting download URL for image', error);
        });
      }).catch(error => {
        setImgUploadSuccess(false);
        setVideoUploadSuccess(false);
        setBulletinUploadSuccess(false);
        setError('Error uploading image');
        console.error('Error uploading image', error);
      });
    }
  };

  const handleVideoUpload = () => {
    if (video) {
      const videoRef = ref(storage, `videos/${uuidv4()}`);
      uploadBytes(videoRef, video).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setVideoUploadSuccess(true);
          setImgUploadSuccess(false);
          setBulletinUploadSuccess(false);
          setError(null);
        }).catch(error => {
          setVideoUploadSuccess(false);
          setImgUploadSuccess(false);
          setBulletinUploadSuccess(false);
          setError('Error getting download URL for video');
          console.error('Error getting download URL for video', error);
        });
      }).catch(error => {
        setVideoUploadSuccess(false);
        setImgUploadSuccess(false);
        setBulletinUploadSuccess(false);
        setError('Error uploading video');
        console.error('Error uploading video', error);
      });
    }
  };

  const handleBulletinImageUpload = () => {
    if (bulletin) {
      const bulletinRef = ref(storage, `bulletins/${uuidv4()}`);
      uploadBytes(bulletinRef, bulletin).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setBulletinUploadSuccess(true);
          setImgUploadSuccess(false);
          setVideoUploadSuccess(false);
          setError(null);
        }).catch(error => {
          setBulletinUploadSuccess(false);
          setImgUploadSuccess(false);
          setVideoUploadSuccess(false);
          setError('Error getting download URL for bulletin image');
          console.error('Error getting download URL for bulletin image', error);
        });
      }).catch(error => {
        setBulletinUploadSuccess(false);
        setImgUploadSuccess(false);
        setVideoUploadSuccess(false);
        setError('Error uploading bulletin image');
        console.error('Error uploading bulletin image', error);
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Image, Video, and Bulletin News Upload</Typography>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{ marginBottom: 2 }}
      >
        Back to Home
      </Button>
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
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Upload Bulletin Image:</Typography>
        <TextField type="file" onChange={(e) => handleFileChange(e, 'bulletin')} />
        <Button variant="contained" color="primary" onClick={handleBulletinImageUpload} sx={{ mt: 1 }}>
          Upload Image
        </Button>
        {bulletinUploadSuccess && <Typography variant="body1" sx={{ mt: 1, color: 'green' }}>Bulletin image uploaded successfully!</Typography>}
      </Box>
      {error && <Typography variant="body1" sx={{ mt: 1, color: 'red' }}>{error}</Typography>}
    </Box>
  );
};

export default Dashboard;
