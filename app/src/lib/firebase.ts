import { initializeApp } from 'firebase/app';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

if (!apiKey) {
  throw new Error('Environment variable REACT_APP_FIREBASE_API_KEY is not defined.');
}

const firebaseConfig = {
  apiKey,
  authDomain: 'lecmane.firebaseapp.com',
  projectId: 'lecmane',
  storageBucket: 'lecmane.appspot.com',
  messagingSenderId: '778439413078',
  appId: '1:778439413078:web:fa20d79292cbf02a521af7',
  measurementId: 'G-6EDNV992VV'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
console.log('FirebaseApp initialized.');
