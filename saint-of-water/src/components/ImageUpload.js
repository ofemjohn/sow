import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { storage, firestore } from './firebaseConfig'; // Adjust the path according to your project structure
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Dashboard = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [bulletPoints, setBulletPoints] = useState([]);
  const [bulletTitle, setBulletTitle] = useState('');
  const [bulletContent, setBulletContent] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const uploadsSnapshot = await getDocs(collection(firestore, 'uploads'));
      uploadsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type === 'image') {
          setImageUrl(data.url);
        } else if (data.type === 'video') {
          setVideoUrl(data.url);
        }
      });

      const bulletPointsSnapshot = await getDocs(collection(firestore, 'bulletPoints'));
      const fetchedBulletPoints = [];
      bulletPointsSnapshot.forEach((doc) => {
        fetchedBulletPoints.push(doc.data());
      });
      setBulletPoints(fetchedBulletPoints);
    };

    fetchData();
  }, []);

  const handleFileUpload = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    console.log("File selected: ", file);
    const fileRef = ref(storage, `${type}/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        console.error('Upload failed', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
        if (type === 'images') {
          await addDoc(collection(firestore, 'uploads'), {
            type: 'image',
            url: downloadURL
          });
          setImageUrl(downloadURL); // Set image URL after confirming upload
        } else if (type === 'videos') {
          await addDoc(collection(firestore, 'uploads'), {
            type: 'video',
            url: downloadURL
          });
          setVideoUrl(downloadURL); // Set video URL after confirming upload
        }
        setUploading(false);
      }
    );
  };

  const handleAddBulletPoint = async () => {
    const newBulletPoint = { title: bulletTitle, text: bulletContent };
    await addDoc(collection(firestore, 'bulletPoints'), newBulletPoint); // Add bullet point to Firestore
    setBulletPoints([...bulletPoints, newBulletPoint]); // Update state after confirming storage
    setBulletTitle('');
    setBulletContent('');
  };

  const handleDeleteBulletPoint = async (index) => {
    const bulletToDelete = bulletPoints[index];
    const querySnapshot = await getDocs(collection(firestore, 'bulletPoints'));
    const bulletToDeleteDoc = querySnapshot.docs.find(doc => doc.data().title === bulletToDelete.title && doc.data().text === bulletToDelete.text);
    if (bulletToDeleteDoc) {
      await deleteDoc(doc(firestore, 'bulletPoints', bulletToDeleteDoc.id));
    }
    setBulletPoints([...bulletPoints.slice(0, index), ...bulletPoints.slice(index + 1)]); // Update state after deletion
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Image Upload
              </Typography>
              <Dropzone onDropAccepted={(files) => handleFileUpload(files, 'images')}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button variant="contained" component="div" sx={{ mt: 2 }}>
                        <CloudUploadIcon />
                        <span>Drag & Drop or Click to Upload</span>
                      </Button>
                    </div>
                  </section>
                )}
              </Dropzone>
              {uploading && <CircularProgress />}
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded content" style={{ width: '100%' }} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Video Upload
              </Typography>
              <Dropzone onDropAccepted={(files) => handleFileUpload(files, 'videos')}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button variant="contained" component="div" sx={{ mt: 2 }}>
                        <CloudUploadIcon />
                        <span>Drag & Drop or Click to Upload</span>
                      </Button>
                    </div>
                  </section>
                )}
              </Dropzone>
              {uploading && <CircularProgress />}
              {videoUrl && (
                <video width="100%" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bullet Points
              </Typography>
              <TextField 
                label="Title" 
                variant="standard" 
                margin="normal" 
                fullWidth 
                value={bulletTitle}
                onChange={(e) => setBulletTitle(e.target.value)} 
              />
              <TextField 
                label="Content" 
                variant="outlined" 
                multiline 
                rows={4} 
                fullWidth 
                value={bulletContent}
                onChange={(e) => setBulletContent(e.target.value)} 
              />
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={handleAddBulletPoint}
              >
                Add Bullet Point
              </Button>
              <BulletPointList bulletPoints={bulletPoints} onDelete={handleDeleteBulletPoint} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const BulletPointList = ({ bulletPoints, onDelete }) => (
  <>
    {bulletPoints.map((bullet, index) => (
      <BulletPoint key={index} title={bullet.title} text={bullet.text} onDelete={() => onDelete(index)} />
    ))}
  </>
);

const BulletPoint = ({ title, text, onDelete }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <div>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2">{text}</Typography>
    </div>
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </div>
);

export default Dashboard;
