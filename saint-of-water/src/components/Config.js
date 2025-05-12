import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDtyl24bsyqEDTAPmcb4i1-oEKeKM2HMbs",
  authDomain: "upload-c092e.firebaseapp.com",
  projectId: "upload-c092e",
  storageBucket: "upload-c092e.appspot.com",
  messagingSenderId: "90496428324",
  appId: "1:90496428324:web:3e2725322cbffbafdd6bb1",
  databaseURL: "https://upload-c092e.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Try to initialize the database with a fallback to avoid crashing
let dbInstance;
try {
  dbInstance = getDatabase(app);
  console.log("Firebase Realtime Database initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Realtime Database:", error);
  // Create a mock database if it's not available
  dbInstance = null;
}

export const db = dbInstance;