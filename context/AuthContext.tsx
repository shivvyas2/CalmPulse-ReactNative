import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import {
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithCredential,
  OAuthProvider,
  UserCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { auth } from '../config/firebase';

// Initialize Google Sign In
WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Helper function to handle auth success
  const handleAuthSuccess = async (userCredential: UserCredential) => {
    setUser(userCredential.user);
    setIsAuthenticated(true);
    router.replace('/(tabs)/home');
  };

  // Helper function to handle auth error
  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    setError(error.message);
  };
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleAuthSuccess(userCredential);
    } catch (e: any) {
      handleAuthError(e);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '366564636514-n8t8s2rh9j5fshkd2kh8epeq3n46oscm.apps.googleusercontent.com',
    iosClientId: '366564636514-n8t8s2rh9j5fshkd2kh8epeq3n46oscm.apps.googleusercontent.com',
    androidClientId: '366564636514-n8t8s2rh9j5fshkd2kh8epeq3n46oscm.apps.googleusercontent.com',
    redirectUri: 'https://calmpulse-bdadb.firebaseapp.com/__/auth/handler',
    scopes: ['profile', 'email']
  });

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await promptAsync();
      
      if (result?.type === 'success') {
        const { id_token, access_token } = result.params;
        
        // Create a credential from the Google ID token and access token
        const credential = GoogleAuthProvider.credential(id_token, access_token);
        
        // Sign in to Firebase with the Google credential
        const userCredential = await signInWithCredential(auth, credential);
        console.log('Google sign in successful:', userCredential.user.email);
        
        await handleAuthSuccess(userCredential);
      } else {
        console.log('Google sign in cancelled or failed:', result);
        setError('Google sign in was cancelled or failed');
      }
    } catch (e: any) {
      console.error('Google sign in error:', e);
      handleAuthError(e);
    }
  };

  const signInWithApple = async () => {
    try {
      setError(null);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = credential;
      if (!identityToken) throw new Error('No identity token provided');

      const provider = new OAuthProvider('apple.com');
      const oAuthCredential = provider.credential({
        idToken: identityToken,
        rawNonce: credential.nonce,
      });

      const userCredential = await signInWithCredential(auth, oAuthCredential);
      await handleAuthSuccess(userCredential);
    } catch (e: any) {
      handleAuthError(e);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await handleAuthSuccess(userCredential);
    } catch (e: any) {
      handleAuthError(e);
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
    signInWithGoogle,
    signInWithApple,
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
