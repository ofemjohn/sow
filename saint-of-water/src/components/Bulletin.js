import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

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

const Bulletin = () => {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesRef = ref(storage, '/bulletins/');
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(imageList.items.map(item => getDownloadURL(item)));
        setBulletins(imageUrls);
        setError(null);
      } catch (error) {
        setError('Error fetching images');
        console.error('Error fetching images', error);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);


  return (
    <Box id="bulletin"sx={{ p: 3, maxWidth: '100%', width: '100%', margin: '0 auto', backgroundColor: '#F5F5F5', borderRadius: '15px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography sx={{ color: '#622967', textAlign: 'center' }} variant="h4" gutterBottom>
        Bulletin Board
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>
      ) : bulletins.length > 0 ? (
        <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {bulletins.map((url, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#FFF', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <img
                src={url}
                alt={`Bulletin Board ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                  borderRadius: '5px',
                }}
              />

              <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>Bulletin {index + 1}</Typography>
            </div>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>No bulletin images found.</Typography>
      )}
    </Box>
  );
};

export default Bulletin;
