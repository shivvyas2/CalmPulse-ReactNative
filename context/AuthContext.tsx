import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { initializeAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const app = initializeApp({
  apiKey: 'your-api-key',
  authDomain: 'calmpulse.firebaseapp.com',
  projectId: 'calmpulse',
  storageBucket: 'calmpulse.appspot.com',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id'
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(drawer)');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/(drawer)');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const value = {
    isLoading,
    isAuthenticated,
    user,
    signIn,
    signUp,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
