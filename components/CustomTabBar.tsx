import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

export function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.tabsContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const animatedIconStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  { scale: withSpring(isFocused ? 1.2 : 1) },
                  { translateY: withSpring(isFocused ? -8 : 0) }
                ]
              };
            });

            let iconName;
            if (route.name === 'home') {
              iconName = isFocused ? 'home' : 'home-outline';
            } else if (route.name === 'breathing') {
              iconName = isFocused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'profile') {
              iconName = isFocused ? 'person' : 'person-outline';
            }

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                  <Ionicons
                    name={iconName}
                    size={24}
                    color={isFocused ? COLORS.primary : '#8E8E93'}
                  />
                  {isFocused && (
                    <View style={styles.dot} />
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    maxWidth: TAB_WIDTH,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  }
});

