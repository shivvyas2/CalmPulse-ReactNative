import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BreathingAnimation from '../components/BreathingAnimation';

const breathingModes = [
  { id: 'focus', title: 'Focus', type: 'Slow' },
  { id: 'meditate', title: 'Meditate', type: 'Calm' },
  { id: 'anxiety', title: 'Anxiety', type: null },
  { id: 'panic', title: 'Panic', type: null },
];

export default function BreathingModeScreen() {
  const navigation = useNavigation();
  const [selectedMode, setSelectedMode] = useState(null);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Select Breathing Mode</Text>
      </View>

      <View style={styles.modesContainer}>
        {breathingModes.map((mode) => (
          <View key={mode.id} style={styles.modeRow}>
            <Text style={styles.modeTitle}>{mode.title}</Text>
            {mode.type && (
              <TouchableOpacity
                style={[
                  styles.modeTypeButton,
                  selectedMode === mode.id && styles.selectedMode,
                ]}
                onPress={() => setSelectedMode(mode.id)}
              >
                <Text style={styles.modeTypeText}>{mode.type}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          if (selectedMode && (selectedType || !breathingModes.find(m => m.id === selectedMode)?.type)) {
            setIsExerciseActive(true);
          }
        }}
      >
        <Text style={styles.startButtonText}>Start Now</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isExerciseActive}
        onRequestClose={() => setIsExerciseActive(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsExerciseActive(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.exerciseTitle}>
              {breathingModes.find(m => m.id === selectedMode)?.title}
            </Text>
            
            <BreathingAnimation
              isActive={isExerciseActive}
              breathingPattern={selectedType || selectedMode}
            />
            
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => {
                setIsExerciseActive(false);
                navigation.navigate('AudioLibrary');
              }}
            >
              <Text style={styles.audioButtonText}>Add Audio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#000',
  },
  audioButton: {
    backgroundColor: '#D4F176',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  audioButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  modesContainer: {
    flex: 1,
    gap: 20,
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modeTitle: {
    fontSize: 18,
    color: '#000',
  },
  modeTypeButton: {
    backgroundColor: '#D4F176',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedMode: {
    backgroundColor: '#BBD55E',
  },
  modeTypeText: {
    color: '#000',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#D4F176',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
