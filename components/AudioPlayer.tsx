import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

interface AudioPlayerProps {
  audioUri: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUri, title }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAudio = async () => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );
      setSound(audioSound);
      
      const status = await audioSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
      }
    } catch (error) {
      console.log('Error loading audio:', error);
    }
  };

  useEffect(() => {
    loadAudio();
  }, [audioUri]);

  const playPauseAudio = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const onSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        minimumTrackTintColor="#D4F176"
        maximumTrackTintColor="#DDDDDD"
        thumbTintColor="#D4F176"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={playPauseAudio}>
        <Text style={styles.playButtonText}>
          {isPlaying ? '⏸️' : '▶️'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
  },
  playButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  playButtonText: {
    fontSize: 32,
  },
});

export default AudioPlayer;
