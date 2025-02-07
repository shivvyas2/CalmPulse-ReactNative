import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AudioPlayer from '../components/AudioPlayer';

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
  {
    id: '1',
    title: 'Ghibli Medley Piano',
    duration: '30:30',
    image: 'https://example.com/placeholder1.jpg',
  },
  {
    id: '2',
    title: 'Peace',
    duration: '30:30',
    image: 'https://example.com/placeholder2.jpg',
  },
  {
    id: '3',
    title: 'Conspersa Prometheum',
    duration: '30:30',
    image: 'https://example.com/placeholder3.jpg',
  },
  {
    id: '4',
    title: 'Night Lofi Playlist',
    duration: '30:30',
    image: 'https://example.com/placeholder4.jpg',
  },
];

export default function AudioLibraryScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '40%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  menuButton: {
    padding: 5,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  selectedCategory: {
    backgroundColor: '#D4F176',
  },
  categoryText: {
    color: '#000',
    fontSize: 16,
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
    marginBottom: 20,
  },
  trackImageContainer: {
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    overflow: 'hidden',
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
});
