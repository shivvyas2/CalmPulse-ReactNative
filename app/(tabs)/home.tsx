import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function HomeScreen() {
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  const features = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Practice mindful breathing techniques',
      icon: 'leaf',
      route: '/(tabs)/breathing',
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: 'Guided meditation sessions',
      icon: 'moon',
      route: '/(tabs)/meditation',
    },
    {
      id: 'sleep',
      title: 'Sleep Stories',
      description: 'Calming stories for better sleep',
      icon: 'bed',
      route: '/(tabs)/sleep',
    },
  ];

  const quickActions = [
    {
      id: 'quick-breathing',
      title: 'Box Breathing',
      duration: '5 min',
      icon: 'timer-outline',
    },
    {
      id: 'quick-meditation',
      title: 'Quick Calm',
      duration: '3 min',
      icon: 'heart-outline',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[COLORS.primary + '20', '#fff']}
        style={styles.gradient}
      >
        {/* Welcome Section */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.email?.split('@')[0] || 'Friend'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <LinearGradient
              colors={[COLORS.primary + '20', COLORS.primary + '40']}
              style={styles.profileGradient}
            >
              <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Today's Progress */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>15</Text>
                <Text style={styles.progressLabel}>Minutes Meditated</Text>
              </View>
              <View style={styles.progressDivider} />
              <View style={styles.progressItem}>
                <Text style={styles.progressNumber}>3</Text>
                <Text style={styles.progressLabel}>Sessions Completed</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action, index) => (
              <Animated.View key={action.id} entering={FadeInRight.delay(400 + index * 100)}>
                <TouchableOpacity style={styles.quickActionCard}>
                  <LinearGradient
                    colors={[COLORS.primary + '20', COLORS.primary + '40']}
                    style={styles.quickActionGradient}
                  >
                    <Ionicons name={action.icon} size={24} color={COLORS.primary} />
                  </LinearGradient>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionDuration}>{action.duration}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Features Grid */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Animated.View
                key={feature.id}
                entering={FadeInRight.delay(500 + index * 100)}
                style={[{ width: (width - SPACING.xl * 3) / 2 }]}
              >
                <TouchableOpacity style={styles.featureCard}>
                  <LinearGradient
                    colors={[COLORS.primary + '10', COLORS.primary + '20']}
                    style={styles.featureGradient}
                  >
                    <Ionicons name={feature.icon} size={32} color={COLORS.primary} />
                  </LinearGradient>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Daily Quote */}
        <Animated.View entering={FadeInDown.delay(500)} style={[styles.section, styles.quoteSection]}>
          <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '40']}
            style={styles.quoteCard}
          >
            <Text style={styles.quoteText}>
              "Breathing in, I calm body and mind. Breathing out, I smile."
            </Text>
            <Text style={styles.quoteAuthor}>- Thich Nhat Hanh</Text>
          </LinearGradient>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray + '30',
    marginHorizontal: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  profileGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: SPACING.lg,
    color: COLORS.text,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    padding: SPACING.lg,
    borderRadius: 20,
    marginRight: SPACING.lg,
    alignItems: 'center',
    width: 140,
    height: 140,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quickActionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: SPACING.sm,
    textAlign: 'center',
    color: COLORS.text,
  },
  quickActionDuration: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.lg,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: SPACING.lg,
    borderRadius: 20,
    alignItems: 'center',
    height: 180,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  featureGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    color: COLORS.text,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.gray,
  },
  quoteSection: {
    marginBottom: SPACING.xl,
  },
  quoteCard: {
    padding: SPACING.xl,
    borderRadius: 20,
    marginTop: SPACING.md,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    color: COLORS.text,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
    color: COLORS.gray,
    marginTop: SPACING.sm,
    color: COLORS.gray,
  },
  quoteCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'right',
  },
});
