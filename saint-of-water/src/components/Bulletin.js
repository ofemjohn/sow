import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './Config';

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
    <div 
      id="bulletin"
      className="p-6 w-full mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md"
    >
      <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">
        Bulletin Board
      </h2>
      
      {loading ? (
        <div className="flex justify-center mt-5">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : bulletins.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bulletins.map((url, index) => (
            <div 
              key={index} 
              className="mb-5 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={url}
                alt={`Bulletin Board ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                Bulletin {index + 1}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No bulletin images found.
        </p>
      )}
    </div>
  );
};

export default Bulletin;
