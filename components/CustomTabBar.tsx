import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const animatedIconStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  {
                    scale: withSpring(isFocused ? 1.1 : 1, SPRING_CONFIG),
                  },
                  {
                    translateY: withSpring(isFocused ? -4 : 0, SPRING_CONFIG),
                  },
                ],
                opacity: withSpring(isFocused ? 1 : 0.7, SPRING_CONFIG),
              };
            });

            const animatedBackgroundStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  {
                    scale: withSpring(isFocused ? 1 : 0, SPRING_CONFIG),
                  },
                ],
                opacity: withSpring(isFocused ? 1 : 0, SPRING_CONFIG),
              };
            });

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <View style={styles.tabContent}>
                  <Animated.View style={[styles.activeBackground, animatedBackgroundStyle]} />
                  <Animated.View style={animatedIconStyle}>
                    {options.tabBarIcon?.({
                      focused: isFocused,
                      color: isFocused ? COLORS.primary : '#000',
                      size: 24,
                    })}
                  </Animated.View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 120,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  background: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    height: '100%',
    paddingTop: 8,
    paddingHorizontal: '15%',
    justifyContent: 'space-between',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  activeBackground: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(212, 241, 118, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 241, 118, 0.3)',
  },
  activeGradient: {
    width: '100%',
    height: '100%',
  },
});
