import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
import GlassCard from '../../components/ui/GlassCard';
import { Ionicons } from '@expo/vector-icons';
import AudioPlayer from '../../components/AudioPlayer';

const categories = ['All', 'Sleep', 'Reading', 'Calm'];

const audioTracks = [
  {
    id: '1',
    title: 'Ghibli Medley Piano',
    duration: '30:30',
    image: 'https://example.com/placeholder1.jpg',
    audioUrl: 'https://example.com/audio/ghibli.mp3',
  },
  {
    id: '2',
    title: 'Peace',
    duration: '30:30',
    image: 'https://example.com/placeholder2.jpg',
    audioUrl: 'https://example.com/audio/peace.mp3',
  },
  {
    id: '3',
    title: 'Conspersa Prometheum',
    duration: '30:30',
    image: 'https://example.com/placeholder3.jpg',
    audioUrl: 'https://example.com/audio/conspersa.mp3',
  },
  {
    id: '4',
    title: 'Night Lofi Playlist',
    duration: '30:30',
    image: 'https://example.com/placeholder4.jpg',
    audioUrl: 'https://example.com/audio/lofi.mp3',
  },
];

export default function AudioScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState<typeof audioTracks[0] | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  return (
    <LinearGradient
      colors={COLORS.gradient.evening}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Discover Serenity{'\n'}& Chill Audio</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.tracksContainer}>
        <View style={styles.trackGrid}>
          {audioTracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackCard}
              onPress={() => {
                setSelectedTrack(track);
                setIsPlayerVisible(true);
              }}
            >
              <View style={styles.trackImageContainer}>
                <View style={styles.trackImage} />
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </View>
              <Text style={styles.trackTitle}>{track.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPlayerVisible}
        onRequestClose={() => setIsPlayerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPlayerVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {selectedTrack && (
              <AudioPlayer
                audioUri={selectedTrack.audioUrl}
                title={selectedTrack.title}
              />
            )}
          </View>
        </View>
      </Modal>
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
    marginBottom: SPACING.lg,
    color: COLORS.background,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginRight: SPACING.md,
    borderRadius: SPACING.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  categoryText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
  tracksContainer: {
    flex: 1,
  },
  trackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trackCard: {
    width: '48%',
    marginBottom: SPACING.lg,
    borderRadius: SPACING.lg,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  trackImageContainer: {
    aspectRatio: 1,
    borderRadius: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  trackImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  trackDuration: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFF',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  trackTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: SPACING.xl,
    borderTopRightRadius: SPACING.xl,
    padding: SPACING.xl,
    minHeight: '40%',
    ...SHADOWS.medium,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});
