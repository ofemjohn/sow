import React, { useState, useEffect, useCallback } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { storage } from './Config';
import { FaImages, FaVideo, FaTimes, FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

const IMAGES_PER_PAGE = 9; // Show 9 images per page (3x3 grid)
const VIDEOS_PER_PAGE = 6; // Show 6 videos per page (2x3 grid)

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('images'); // 'images' or 'videos'
  const navigate = useNavigate();

  // Calculate pagination values
  const totalPages = Math.ceil(
    activeTab === 'images' 
      ? images.length / IMAGES_PER_PAGE 
      : videos.length / VIDEOS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * (activeTab === 'images' ? IMAGES_PER_PAGE : VIDEOS_PER_PAGE);
  const endIndex = startIndex + (activeTab === 'images' ? IMAGES_PER_PAGE : VIDEOS_PER_PAGE);
  const currentItems = activeTab === 'images' 
    ? images.slice(startIndex, endIndex)
    : videos.slice(startIndex, endIndex);

  const fetchImages = useCallback(async () => {
    try {
      const imagesRef = ref(storage, 'images/');
      const imageList = await listAll(imagesRef);
      const imageUrls = await Promise.all(imageList.items.map(item => getDownloadURL(item)));
      setImages(imageUrls);
      setError(null);
    } catch (error) {
      console.error('Error fetching images', error);
      setError('Error fetching images');
    }
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const videosRef = ref(storage, 'videos/');
      const videoList = await listAll(videosRef);
      const videoUrls = await Promise.all(videoList.items.map(item => getDownloadURL(item)));
      setVideos(videoUrls);
      setError(null);
    } catch (error) {
      console.error('Error fetching videos', error);
      setError('Error fetching videos');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchImages(), fetchVideos()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchImages, fetchVideos]);

  // Reset to first page when active tab or items array changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, images.length, videos.length]);

  const openImageModal = (url, index) => {
    setSelectedImage(url);
    setSelectedIndex(startIndex + index);
    document.body.style.overflow = 'hidden';
  };

  const openVideoModal = (url, index) => {
    setSelectedVideo(url);
    setSelectedIndex(startIndex + index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    let newIndex = selectedIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage && !selectedVideo) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          if (selectedImage) navigateImage(-1);
          break;
        case 'ArrowRight':
          if (selectedImage) navigateImage(1);
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedVideo, selectedIndex, images]);

  // Handle page navigation
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed
          text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3 py-1 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-2 py-1 text-gray-400">...</span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            currentPage === i
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2 py-1 text-gray-400">...</span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3 py-1 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed
          text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    );

    return buttons;
  };

  return (
    <div
      id="gallery"
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            RCCG Scent of Water Parish Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience our journey of faith through moments of worship, fellowship, and divine encounters at The Redeemed Christian Church of God, Scent of Water Parish
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('images')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'images'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              <FaImages className="mr-2" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'videos'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              <FaVideo className="mr-2" />
              Videos
            </button>
          </div>
        </div>

        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg">
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading gallery...</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 ${activeTab === 'images' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4 mb-8`}>
              {activeTab === 'images' ? (
                currentItems.map((url, index) => (
                  <div
                    key={startIndex + index}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => openImageModal(url, index)}
                  >
                    <img
                      src={url}
                      alt={`Gallery item ${startIndex + index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaImages className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ))
              ) : (
                currentItems.map((url, index) => (
                  <div
                    key={startIndex + index}
                    className="group relative aspect-video overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => openVideoModal(url, index)}
                  >
                    <video
                      src={url}
                      className="h-full w-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <FaPlay className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  {renderPaginationButtons()}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, activeTab === 'images' ? images.length : videos.length)} of {activeTab === 'images' ? images.length : videos.length} {activeTab}
                </p>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateImage(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateImage(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

            <img
              src={selectedImage}
              alt="Selected gallery item"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/20 px-4 py-2 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl mx-auto aspect-video">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;