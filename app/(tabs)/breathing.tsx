import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import BreathingTimer from '../../components/BreathingTimer';

const BREATHING_PHASES = {
  IN: { duration: 4000, type: 'in' },
  OUT: { duration: 4000, type: 'out' },
} as const;

const NEXT_MEDITATION = {
  title: '10 Minutes Meditation',
  duration: '10:00',
};

export default function BreathingScreen() {
  const [currentPhase, setCurrentPhase] = useState<'in' | 'out'>('in');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentPhase(prev => prev === 'in' ? 'out' : 'in');
      }, BREATHING_PHASES[currentPhase.toUpperCase() as 'IN' | 'OUT'].duration);

      return () => clearInterval(interval);
    }
  }, [isActive, currentPhase]);

  return (
    <View style={styles.container}>
      <Link href="../" style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Link>
      
      <Pressable style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#000" />
      </Pressable>

      <BreathingTimer
        phase={currentPhase}
        duration={BREATHING_PHASES[currentPhase.toUpperCase() as 'IN' | 'OUT'].duration}
        isActive={isActive}
      />

      <Pressable 
        style={styles.playButton}
        onPress={() => setIsActive(!isActive)}
      >
        <Ionicons 
          name={isActive ? 'pause' : 'play'} 
          size={32} 
          color="#000" 
        />
      </Pressable>

      <View style={styles.nextSection}>
        <Text style={styles.nextLabel}>Next</Text>
        <Text style={styles.nextTitle}>{NEXT_MEDITATION.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.xxl + SPACING.md,
    left: SPACING.lg,
    zIndex: 10,
  },
  menuButton: {
    position: 'absolute',
    top: SPACING.xxl + SPACING.md,
    right: SPACING.lg,
    zIndex: 10,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextSection: {
    position: 'absolute',
    bottom: SPACING.xxl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextLabel: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: FONTS.sizes.sm,
    color: '#666',
    marginBottom: SPACING.xs,
  },
  nextTitle: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: FONTS.sizes.lg,
    color: '#000',
  },

});
