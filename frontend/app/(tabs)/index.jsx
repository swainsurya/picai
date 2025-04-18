import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(100);
  const [showDownload, setShowDownload] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    
    if (credits <= 0) {
      alert('You are out of credits! Please purchase more.');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setGeneratedImage(null);
    setShowDownload(false);

    // Simulate API call
    setTimeout(() => {
      setGeneratedImage('https://source.unsplash.com/random/800x600/?ai,art,' + 
        encodeURIComponent(prompt));
      setCredits(credits - 1);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = () => {
    alert('Image downloaded!');
    setShowDownload(false);
  };

  return (
    <LinearGradient colors={['#f8f9fa', '#e9ecef']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pic-AI</Text>
          <View style={styles.creditBadge}>
            <Icon name="zap" size={16} color="#f8f9fa" />
            <Text style={styles.creditText}>{credits}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Prompt Input */}
          <TextInput
            style={styles.input}
            placeholder="Describe your vision..."
            placeholderTextColor="#adb5bd"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Generate Button */}
          <TouchableOpacity 
            style={[
              styles.generateButton,
              loading && styles.disabledButton
            ]} 
            onPress={handleGenerate}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="sparkles" size={18} color="#fff" />
                <Text style={styles.buttonText}>Generate Art</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Image Preview */}
          <View style={styles.imageContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6c757d" />
                <Text style={styles.loadingText}>Creating your masterpiece...</Text>
              </View>
            ) : generatedImage ? (
              <>
                <Pressable 
                  onPress={() => setShowDownload(!showDownload)}
                  style={styles.imageWrapper}
                >
                  <Image 
                    source={{ uri: generatedImage }} 
                    style={styles.image} 
                    resizeMode="cover"
                  />
                </Pressable>
                {showDownload && (
                  <TouchableOpacity 
                    style={styles.downloadButton}
                    onPress={handleDownload}
                  >
                    <Icon name="download" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.placeholderContainer}>
                <Icon name="image" size={48} color="#ced4da" />
                <Text style={styles.placeholderText}>
                  Your generated artwork will appear here
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#212529',
    letterSpacing: 0.5,
  },
  creditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#495057',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  creditText: {
    color: '#f8f9fa',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#212529',
    borderWidth: 1,
    borderColor: '#dee2e6',
    minHeight: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4361ee',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  loadingText: {
    color: '#6c757d',
    fontSize: 16,
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    padding: 20,
  },
  placeholderText: {
    color: '#adb5bd',
    fontSize: 16,
    textAlign: 'center',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;