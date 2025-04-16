import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';


const ModernCaptionApp = () => {
  const [credits, setCredits] = useState(150);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('Your generated caption will appear here');
  const [isProcessing, setIsProcessing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      animatePulse();
      setCredits(c => c - 10);
    }
  };

  const handleCaptionize = () => {
    if (!image) {
      Alert.alert('Select an Image', 'Please upload an image first');
      return;
    }
    if (credits < 20) {
      Alert.alert('Insufficient Credits', 'You need at least 20 credits');
      return;
    }

    setIsProcessing(true);
    setCredits(c => c - 20);
    animateFade();

    // Simulate API call
    setTimeout(() => {
      const sampleCaptions = [
        "A serene river scene with wildlife in its natural habitat",
        "Wildlife enjoying a sunny day by the water",
        "Nature's beauty captured in a single moment"
      ];
      setCaption(sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)]);
      setIsProcessing(false);
    }, 2000);
  };

  const animateFade = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const animatePulse = () => {
    pulseAnim.setValue(1);
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <LinearGradient colors={['#f8f9fa', '#e9ecef']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Pic-AI</Text>
        <View style={styles.creditBadge}>
          <Icon name="zap" size={16} color="#f8f9fa" />
          <Text style={styles.creditText}>{credits}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {image ? (
          <Animated.View style={[styles.imageContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image source={{ uri: image }} style={styles.image} />
          </Animated.View>
        ) : (
          <TouchableOpacity style={styles.uploadPrompt} onPress={pickImage}>
            <MaterialIcons name="add-a-photo" size={48} color="#adb5bd" />
            <Text style={styles.uploadText}>Tap to upload image</Text>
          </TouchableOpacity>
        )}

        <Animated.View style={[styles.captionBox, { opacity: fadeAnim }]}>
          <Text style={styles.captionText}>{caption}</Text>
          {isProcessing && (
            <View style={styles.loading}>
              <MaterialIcons name="autorenew" size={20} color="#495057" style={styles.spinner} />
            </View>
          )}
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.button, styles.uploadButton]} 
          onPress={pickImage}
        >
          <MaterialIcons name="cloud-upload" size={24} color="white" />
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.captionButton]} 
          onPress={handleCaptionize}
          disabled={isProcessing}
        >
          <MaterialIcons name="auto-awesome" size={24} color="white" />
          <Text style={styles.buttonText}>
            {isProcessing ? 'Processing...' : 'Captionize'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#212529',
    letterSpacing: 1,
  },
  creditBadge: {
    flexDirection: 'row',
    backgroundColor: '#495057',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  creditText: {
    color: '#f8f9fa',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadPrompt: {
    height: 300,
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  uploadText: {
    marginTop: 16,
    fontSize: 16,
    color: '#adb5bd',
  },
  imageContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captionBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    minHeight: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  captionText: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
    lineHeight: 24,
  },
  loading: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  spinner: {
    animationKeyframes: {
      '0%': { transform: [{ rotate: '0deg' }] },
      '100%': { transform: [{ rotate: '360deg' }] },
    },
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButton: {
    backgroundColor: '#4dabf7',
  },
  captionButton: {
    backgroundColor: '#20c997',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ModernCaptionApp;