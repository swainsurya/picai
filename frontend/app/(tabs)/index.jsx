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
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const GenerateScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [hover, setHover] = useState(false);

  const handleGenerate = () => {
    setGeneratedImage('https://via.placeholder.com/400x300.png?text=AI+Generated+Image');
  };

  const handleDownload = () => {
    alert('Downloading image...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>AI Image Generator</Text>

        {/* Prompt Input */}
        <TextInput
          style={styles.input}
          placeholder="Describe your image idea..."
          placeholderTextColor="#888"
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
          <Text style={styles.btnText}>Generate Image</Text>
        </TouchableOpacity>

        {/* Image Box */}
        <Pressable
          onLongPress={() => setHover(true)}
          onPressOut={() => setHover(false)}
          style={styles.imageContainer}
        >
          {generatedImage ? (
            <>
              <Image source={{ uri: generatedImage }} style={styles.image} />
              {hover && (
                <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                  <Icon name="download" size={24} color="#333" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.placeholderText}>Your image will appear here</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    minHeight: height,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: height * 0.15,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  generateBtn: {
    backgroundColor: '#4c8bf5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#4c8bf5',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  downloadBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});

export default GenerateScreen;
