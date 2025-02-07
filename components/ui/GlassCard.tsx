import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { SHADOWS } from '../../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  intensity = 50 
}) => {
  return (
    <BlurView intensity={intensity} style={[styles.container, style]}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    ...SHADOWS.medium,
  },
});

export default GlassCard;
