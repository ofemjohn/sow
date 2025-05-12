import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { storage } from './Config';

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary-600">
        SOW Video Gallery
      </h1>
      
      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}
      
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <>
          <button
            onClick={() => navigate('/')}
            className="mb-4 px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Back to Home
          </button>
          
          <div className="flex flex-wrap justify-center gap-6">
            {videos.map((url, index) => (
              <div key={index} className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <video
                  src={url}
                  controls
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Video {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
