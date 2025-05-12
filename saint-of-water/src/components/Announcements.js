import React, { useState, useEffect, useRef } from 'react';
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './Config';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';

const Announcements = () => {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch bulletins from Firebase Storage
        const imagesRef = storageRef(storage, '/bulletins/');
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(
          imageList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            // Generate a random date within the last 3 months for demo purposes
            const today = new Date();
            const randomDaysAgo = Math.floor(Math.random() * 90);
            const date = new Date(today.setDate(today.getDate() - randomDaysAgo));
            return {
              url,
              date: date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              title: `Church Bulletin ${imageList.items.indexOf(item) + 1}`,
            };
          })
        );
        setBulletins(imageUrls);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('Error fetching content');
        console.error('Error fetching content', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === bulletins.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? bulletins.length - 1 : prev - 1));
  };

  const openFullscreen = (url) => {
    setFullscreenImage(url);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  // Determine column sizes for the masonry layout
  const getColumnClass = (index) => {
    // Create a visually interesting pattern of column spans
    const pattern = index % 5;
    switch (pattern) {
      case 0:
        return 'md:col-span-2 row-span-2';
      case 2:
        return 'md:col-span-2';
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <div
      id="announcements"
      className="relative py-20 sm:py-28"
    >
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5 dark:opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 backdrop-blur-sm mb-4">
            Parish Bulletins
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400 text-transparent bg-clip-text">
            Church Bulletin Board
          </h2>
          <p className="text-lg text-gray-600 dark:text-blue-100/70 max-w-2xl mx-auto">
            View our weekly church bulletins with important announcements, events, and information for the parish community.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium">Loading bulletins...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-700/30">
            <p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
          </div>
        ) : (
          <>
            {bulletins.length > 0 ? (
              <>
                {/* Mobile Carousel View */}
                <div className="md:hidden relative rounded-xl overflow-hidden shadow-2xl mb-12 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div 
                    ref={carouselRef}
                    className="relative"
                  >
                    {bulletins.map((bulletin, index) => (
                      <div 
                        key={index}
                        className={`transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                      >
                        <div className="relative aspect-[3/4] bg-indigo-50 dark:bg-indigo-950">
                          <img
                            src={bulletin.url}
                            alt={bulletin.title}
                            className="w-full h-full object-contain"
                            onClick={() => openFullscreen(bulletin.url)}
                          />
                          <button 
                            className="absolute bottom-3 right-3 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg"
                            onClick={() => openFullscreen(bulletin.url)}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span className="text-sm font-medium">{bulletin.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {bulletin.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Tap on the image to view the full bulletin
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel Controls */}
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button 
                      onClick={prevSlide}
                      className="p-2 m-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 focus:outline-none"
                    >
                      <FaChevronLeft className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button 
                      onClick={nextSlide}
                      className="p-2 m-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 focus:outline-none"
                    >
                      <FaChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
                    <div className="flex space-x-2">
                      {bulletins.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-indigo-600 w-5' : 'bg-gray-300 dark:bg-gray-600'} transition-all duration-300`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Desktop Masonry Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                  {bulletins.map((bulletin, index) => (
                    <div 
                      key={index}
                      className={`${getColumnClass(index)} group overflow-hidden rounded-xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex flex-col`}
                    >
                      <div className="relative overflow-hidden bg-indigo-50 dark:bg-indigo-950 flex-grow">
                        <img
                          src={bulletin.url}
                          alt={bulletin.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onClick={() => openFullscreen(bulletin.url)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                          <div className="text-white">
                            <div className="flex items-center gap-2 mb-1">
                              <FaCalendarAlt className="w-3.5 h-3.5" />
                              <span className="text-sm font-medium">{bulletin.date}</span>
                            </div>
                            <h3 className="text-lg font-bold">
                              {bulletin.title}
                            </h3>
                          </div>
                          <button 
                            className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              openFullscreen(bulletin.url);
                            }}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-md mx-auto p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-lg text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No bulletin images available at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Image Viewer */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"
            onClick={closeFullscreen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenImage}
              alt="Fullscreen bulletin"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements; 