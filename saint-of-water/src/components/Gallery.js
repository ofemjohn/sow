import React, { useState, useEffect } from 'react';
import { Box, Typography, ImageListItem } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
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

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(storage, 'images/');
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(imageList.items.map(item => getDownloadURL(item)));
        setImages(imageUrls);
      } catch (error) {
        setError('Error fetching images');
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (currentSlide) => setCurrentImageIndex(currentSlide),
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{
        color: '#622967'
      }} variant="h4" gutterBottom>
        SOW Photo Gallery
      </Typography>
      {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
      <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
        <Slider {...settings}>
          {images.map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={`${url}?w=800&fit=crop&auto=format`}
                srcSet={`${url}?w=800&fit=crop&auto=format&dpr=2 2x`}
                alt={`Gallery image ${index}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'cover',
                }}
              />
            </ImageListItem>
          ))}
        </Slider>
        {images.length > 1 && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            {currentImageIndex + 1} / {images.length}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Gallery;
