import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
import GlassCard from '../../components/ui/GlassCard';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { id: 'stats', title: 'Statistics', icon: 'stats-chart' },
  { id: 'history', title: 'History', icon: 'time' },
  { id: 'favorites', title: 'Favorites', icon: 'heart' },
  { id: 'settings', title: 'Settings', icon: 'settings' },
  { id: 'help', title: 'Help & Support', icon: 'help-circle' },
];

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={COLORS.gradient.calm}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Profile</Text>

      <GlassCard style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.username}>User Name</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </GlassCard>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name={item.icon as any} size={24} color="#000" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.lg,
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xxxl,
    marginBottom: SPACING.xl,
    color: COLORS.text,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: SPACING.xl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.xl,
    ...SHADOWS.small,
  },
  editButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: SPACING.md,
    ...SHADOWS.small,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#000',
  },
});
