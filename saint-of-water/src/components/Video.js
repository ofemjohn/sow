import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

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

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const videosRef = ref(storage, 'videos/');
        const videoList = await listAll(videosRef);
        const videoUrls = await Promise.all(videoList.items.map(item => getDownloadURL(item)));
        setVideos(videoUrls);
        setError(null);
      } catch (error) {
        setError('Error fetching videos');
        console.error('Error fetching videos', error);
      }
      setLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ color: '#622967' }} variant="h4" gutterBottom>
        SOW Video Gallery
      </Typography>
      {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
      {loading ? (
        <Typography variant="body1" sx={{ color: 'gray', textAlign: 'center' }}>Loading...</Typography>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ marginBottom: 2 }}
          >
            Back to Home
          </Button>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
            {videos.map((url, index) => (
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="video"
                  src={url}
                  controls
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Video {index + 1}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Video;
