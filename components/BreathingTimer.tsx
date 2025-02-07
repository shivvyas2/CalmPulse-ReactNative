import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface BreathingTimerProps {
  phase: 'in' | 'out';
  duration: number;
  isActive: boolean;
}

const BreathingTimer: React.FC<BreathingTimerProps> = ({ phase, duration, isActive }) => {
  const [progress] = useState(new Animated.Value(0));
  const [rotateAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isActive) {
      Animated.timing(progress, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      progress.setValue(0);
      rotateAnimation.setValue(0);
    }
  }, [isActive, phase]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathe {phase === 'in' ? 'In' : 'Out'}</Text>
      <Text style={styles.timer}>00:{duration / 1000 < 10 ? '0' : ''}{Math.floor(duration / 1000)}</Text>
      
      <Animated.View style={[styles.circleContainer, { transform: [{ rotate }] }]}>
        <Svg height="300" width="300" viewBox="0 0 100 100">
          {/* Dotted circle background */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E0E0E0"
            strokeWidth="0.5"
            strokeDasharray="2,3"
            fill="none"
          />
          
          {/* Progress gradient arc */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={COLORS.primary}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45 * 0.75}, ${2 * Math.PI * 45}`}
            transform="rotate(-90, 50, 50)"
          />
          
          {/* Center indicator */}
          <Path
            d="M48 50L52 50M50 48L50 52"
            stroke={COLORS.primary}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xxxl,
    color: '#000',
    marginBottom: SPACING.sm,
  },
  timer: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: '#666',
    marginBottom: SPACING.xl,
  },
  circleContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BreathingTimer;
