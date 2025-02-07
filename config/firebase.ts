import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAl1dBn-O4hhJwzhGzvCPZm-rn1ae9nNU8",
  authDomain: "calmpulse-bdadb.firebaseapp.com",
  projectId: "calmpulse-bdadb",
  storageBucket: "calmpulse-bdadb.firebasestorage.app",
  messagingSenderId: "366564636514",
  appId: "1:366564636514:web:47793ecd58bca42404de3b",
  measurementId: "G-6Y5F52WWM7"
};

// Initialize Firebase
let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
