import 'expo-dev-client';
import { useEffect } from 'react';
import { View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { app } from './config/firebase';

export default function App() {
  useEffect(() => {
    // Initialize Firebase app
    if (app) {
      console.log('Firebase initialized successfully');
    }
  }, []);

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        {/* Your app content will be rendered here by Expo Router */}
      </View>
    </AuthProvider>
  );
}
