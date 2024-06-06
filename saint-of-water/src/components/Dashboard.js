import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  const [loading, setLoading] = useState(false);
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

  const uploadFile = (file, fileType, setSuccess) => {
    if (file) {
      setLoading(true);
      const fileRef = ref(storage, `${fileType}/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can add progress tracking here if needed
        },
        (error) => {
          setLoading(false);
          setError(`Error uploading ${fileType}`);
          console.error(`Error uploading ${fileType}`, error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setLoading(false);
            setSuccess(true);
            setError(null);
          }).catch((error) => {
            setLoading(false);
            setError(`Error getting download URL for ${fileType}`);
            console.error(`Error getting download URL for ${fileType}`, error);
          });
        }
      );
    }
  };

  const handleImageUpload = () => {
    setImgUploadSuccess(false);
    setVideoUploadSuccess(false);
    setBulletinUploadSuccess(false);
    uploadFile(img, 'images', setImgUploadSuccess);
  };

  const handleVideoUpload = () => {
    setImgUploadSuccess(false);
    setVideoUploadSuccess(false);
    setBulletinUploadSuccess(false);
    uploadFile(video, 'videos', setVideoUploadSuccess);
  };

  const handleBulletinImageUpload = () => {
    setImgUploadSuccess(false);
    setVideoUploadSuccess(false);
    setBulletinUploadSuccess(false);
    uploadFile(bulletin, 'bulletins', setBulletinUploadSuccess);
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
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography variant="body1" sx={{ mt: 1, color: 'red' }}>{error}</Typography>}
    </Box>
  );
};

export default Dashboard;
