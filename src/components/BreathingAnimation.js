import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const BreathingAnimation = ({ isActive, breathingPattern }) => {
  const animatedValue = new Animated.Value(0);

  const getBreathingPattern = () => {
    switch (breathingPattern) {
      case 'Slow':
        return { inhale: 4000, hold: 4000, exhale: 4000 };
      case 'Calm':
        return { inhale: 4000, hold: 7000, exhale: 8000 };
      case 'Anxiety':
        return { inhale: 4000, hold: 2000, exhale: 6000 };
      case 'Panic':
        return { inhale: 2000, hold: 1000, exhale: 4000 };
      default:
        return { inhale: 4000, hold: 4000, exhale: 4000 };
    }
  };

  useEffect(() => {
    if (isActive) {
      const pattern = getBreathingPattern();
      
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: pattern.inhale,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: pattern.hold,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: pattern.exhale,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (isActive) {
          animatedValue.setValue(0);
        }
      });
    }
  }, [isActive, breathingPattern]);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circleContainer,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Svg height="200" width="200" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#D4F176"
            strokeWidth="2"
            fill="#D4F176"
            fillOpacity={0.3}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 200,
    height: 200,
  },
});

export default BreathingAnimation;
