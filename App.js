import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import BreathingModeScreen from './src/screens/BreathingModeScreen';
import AudioLibraryScreen from './src/screens/AudioLibraryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="BreathingMode" component={BreathingModeScreen} />
        <Stack.Screen name="AudioLibrary" component={AudioLibraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
