import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [credits, setCredits] = useState(100); // Initial credits set to 100
  const [imageClicked, setImageClicked] = useState(false); // State to track image click

  const handleGenerate = async () => {
    if (credits > 0) {
      setLoading(true);
      setGeneratedImage(null);

      // Simulate generation delay
      setTimeout(() => {
        setGeneratedImage('https://via.placeholder.com/400x300.png?text=AI+Generated+Image');
        setCredits(credits - 1); // Decrease credits after each image generation
        setLoading(false);
      }, 2000);
    } else {
      alert('You are out of credits! Please purchase more.');
    }
  };

  const handleDownload = () => {
    alert('Downloading image...');
    // You can implement actual download logic here
  };

  const handleImageClick = () => {
    setImageClicked(!imageClicked); // Toggle the state on image click
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Credits section */}
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>Credits: {credits}</Text>
        </View>

        <Text style={styles.heading}>🎨 AI Image Generator</Text>

        <TextInput
          style={styles.input}
          placeholder="Imagine something amazing..."
          placeholderTextColor="#aaa"
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} disabled={loading}>
          <Text style={styles.btnText}>{loading ? 'Generating...' : 'Generate'}</Text>
        </TouchableOpacity>

        <Pressable
          onLongPress={() => setHover(true)}
          onPressOut={() => setHover(false)}
          onPress={handleImageClick} // Add onPress to handle image click
          style={styles.imageBox}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#5c9eff" />
          ) : generatedImage ? (
            <>
              <Image source={{ uri: generatedImage }} style={styles.image} />
              {imageClicked && ( // Show the download button only when the image is clicked
                <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                  <Icon name="download" size={22} color="#444" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.placeholder}>Generated image will appear here</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  creditsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    height: height * 0.16,
    textAlignVertical: 'top',
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  generateBtn: {
    backgroundColor: '#5c9eff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#5c9eff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  imageBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    height: height * 0.35,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholder: {
    color: '#aaa',
    fontSize: 15,
  },
  downloadBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});

export default index;
