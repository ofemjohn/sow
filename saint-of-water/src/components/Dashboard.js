import React, { useState } from 'react';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { storage } from './Config';
import { FaTimes } from 'react-icons/fa';

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
      const fileRef = storageRef(storage, `${fileType}/${uuidv4()}`);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Dashboard
      </h1>
      
      <button
        onClick={() => navigate('/')}
        className="mb-8 px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
      >
        Back to Home
      </button>

      {/* Media Upload Section */}
      <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Image, Video, and Bulletin Uploads
        </h2>

        <div className="space-y-8">
          {/* Image Upload Section */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Upload Image:
            </h3>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'image')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <button
              onClick={handleImageUpload}
              className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Upload Image
            </button>
            {imgUploadSuccess && (
              <p className="mt-2 text-green-600">Image uploaded successfully!</p>
            )}
          </div>

          {/* Video Upload Section */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Upload Video:
            </h3>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'video')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <button
              onClick={handleVideoUpload}
              className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Upload Video
            </button>
            {videoUploadSuccess && (
              <p className="mt-2 text-green-600">Video uploaded successfully!</p>
            )}
          </div>

          {/* Bulletin Upload Section */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Upload Bulletin Image:
            </h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Upload bulletin images that contain church announcements, events, and important information. These will be displayed in the Bulletin Board section.
            </p>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, 'bulletin')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <button
              onClick={handleBulletinImageUpload}
              className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Upload Bulletin
            </button>
            {bulletinUploadSuccess && (
              <p className="mt-2 text-green-600">Bulletin image uploaded successfully!</p>
            )}
          </div>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-600 border-indigo-200"></div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">Processing...</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <FaTimes className="w-5 h-5" />
            <p>{error}</p>
          </div>
          <button 
            className="absolute top-1 right-1 text-red-500 hover:text-red-700"
            onClick={() => setError(null)}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
