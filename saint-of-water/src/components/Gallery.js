import React, { useState, useEffect } from 'react';
import { Box, Typography, ImageListItem, Button, CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { storage } from './Config';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesRef = ref(storage, 'images/');
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(imageList.items.map(item => getDownloadURL(item)));
        setImages(imageUrls);
        setError(null);
      } catch (error) {
        setError('Error fetching images');
        console.error('Error fetching images', error);
      }
      setLoading(false);
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
    <Box sx={{ p: 3, position: 'relative' }}>
      <Typography sx={{ color: '#622967', textAlign: 'center' }} variant="h4" gutterBottom>
        SOW Photo Gallery
      </Typography>
      {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
          <Slider {...settings}>
            {images.map((url, index) => (
              <ImageListItem key={index}>
                <img
                  src={url}
                  srcSet={`${url}?w=800&fit=crop&auto=format&dpr=1 1x, ${url}?w=800&fit=crop&auto=format&dpr=2 2x`}
                  alt={`Gallery item ${index + 1}`}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/video')}
              sx={{
                backgroundColor: '#622967',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#501f53',
                },
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '16px',
              }}
            >
              Go to Video Gallery
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
