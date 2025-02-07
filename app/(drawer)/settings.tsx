import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

export default function SettingsScreen() {
  const handleLogout = async () => {
    // TODO: Implement Firebase logout
    try {
      // await signOut(auth);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: SPACING.xxl,
    marginTop: SPACING.xxl,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
